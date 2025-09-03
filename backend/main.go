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

	//repository
	articleRepository := repositories.NewArticleRepository(db)
	skillRepository := repositories.NewSkillRepository(db)

	//handler
	articleHandler := handlers.NewArticleHandler(articleRepository)
	skillHandler := handlers.NewSkillHandler(skillRepository)

	handlerContainer := &routes.Handlers{
		ArticleHandler: articleHandler,
		SkillHandler:   skillHandler,
	}

	router := routes.SetupRouter(handlerContainer)

	router.Run(":8080")
}
