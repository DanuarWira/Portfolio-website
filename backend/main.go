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
	portfolioRepository := repositories.NewPortfolioRepository(db)

	//handler
	articleHandler := handlers.NewArticleHandler(articleRepository)
	skillHandler := handlers.NewSkillHandler(skillRepository)
	experienceHandler := handlers.NewExperienceHandler(experienceRepository)
	portfolioHandler := handlers.NewPortfolioHandler(portfolioRepository)
	uploadHandler := handlers.NewUploadHandler()

	handlerContainer := &routes.Handlers{
		ArticleHandler:    articleHandler,
		SkillHandler:      skillHandler,
		ExperienceHandler: experienceHandler,
		PortfolioHandler:  portfolioHandler,
		UploadHandler:     uploadHandler,
	}

	router := routes.SetupRouter(handlerContainer)

	router.Run(":8080")
}
