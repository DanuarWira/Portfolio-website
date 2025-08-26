package main

import (
	"backend/db"
	"backend/handlers"
	"backend/repositories"
	"backend/routes"
)

func main() {
	db := db.ConnectDB()
	defer db.Close()

	articleRepository := repositories.NewArticleRepository(db)
	articleHandler := handlers.NewArticleHandler(articleRepository)

	router := routes.SetupRouter(articleHandler)

	router.Run(":8080")
}
