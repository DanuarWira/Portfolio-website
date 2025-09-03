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
	experienceRepository := repositories.NewExperienceRepository(db)

	//handler
	articleHandler := handlers.NewArticleHandler(articleRepository)
	skillHandler := handlers.NewSkillHandler(skillRepository)
	experienceHandler := handlers.NewExperienceHandler(experienceRepository)

	handlerContainer := &routes.Handlers{
		ArticleHandler:    articleHandler,
		SkillHandler:      skillHandler,
		ExperienceHandler: experienceHandler,
	}

	router := routes.SetupRouter(handlerContainer)

	router.Run(":8080")
}
