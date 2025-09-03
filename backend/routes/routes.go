package routes

import (
	"backend/handlers"

	"github.com/gin-gonic/gin"
)

type Handlers struct {
	ArticleHandler    *handlers.ArticleHandler
	SkillHandler      *handlers.SkillHandler
	ExperienceHandler *handlers.ExperienceHandler
}

func SetupRouter(handlers *Handlers) *gin.Engine {
	router := gin.Default()

	router.Static("/public", "./public")

	api := router.Group("/api/v1")
	{
		//article routes
		api.GET("/articles", handlers.ArticleHandler.GetArticles)
		api.GET("/articles/:slug", handlers.ArticleHandler.GetArticlesBySlug)
		api.POST("/articles", handlers.ArticleHandler.CreateArticles)
		api.DELETE("/articles/:id", handlers.ArticleHandler.DeleteArticle)
		api.PUT("/articles/:id", handlers.ArticleHandler.UpdateArticle)

		//experience routes
		api.GET("/experiences", handlers.ExperienceHandler.GetExperiences)
		api.POST("experiences", handlers.ExperienceHandler.CreateExperiences)
		api.DELETE("/experiences/:id", handlers.ExperienceHandler.DeleteExperiences)
		api.PUT("/experiences/:id", handlers.ExperienceHandler.UpdateExperiences)

		//portfolio routes

		//skill routes
		api.GET("/skills", handlers.SkillHandler.GetSkills)
		api.POST("/skills", handlers.SkillHandler.CreateSkills)
		api.DELETE("/skills/:id", handlers.SkillHandler.DeleteSkills)
		api.PUT("/skills/:id", handlers.SkillHandler.UpdateSkills)
	}

	return router
}
