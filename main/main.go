package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

type Artist struct {
	Name           string   `json:"name"`
	Image          string   `json:"image"`
	Members        []string `json:"members"`
	CreationDate   int      `json:"creationDate"`
	FirstTimeAlbum string   `json:"firstAlbum"`
}

const PORT = ":8100"

var artistList []Artist

var tpl = template.Must(template.ParseFiles("static/index.html"))

func main() {
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		getArtist()

		// Pass the artist list to the template
		err := tpl.Execute(w, artistList)
		if err != nil {
			log.Fatal(err)
		}
	})
	fmt.Println("Le serveur est en cours d'exécution sur http://localhost" + PORT)
	http.ListenAndServe(PORT, nil)
}

func getArtist() {
	resp, err := http.Get("https://groupietrackers.herokuapp.com/api/artists")
	if err != nil {
		log.Fatalln(err)
	}

	body_b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	json.Unmarshal(body_b, &artistList)
}

func init() {
	// Parse the template and add a function to filter artist names
	tpl = template.Must(tpl.Funcs(template.FuncMap{"filterArtists": filterArtists}).ParseFiles("static/index.html"))
}

// Function to filter artist names based on the search term
func filterArtists(searchTerm string) []Artist {
	filteredArtists := make([]Artist, 0)
	for _, artist := range artistList {
		if strings.Contains(strings.ToLower(artist.Name), strings.ToLower(searchTerm)) {
			filteredArtists = append(filteredArtists, artist)
		}
	}
	return filteredArtists
}
