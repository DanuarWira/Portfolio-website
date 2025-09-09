package routes

import (
	"backend/auth"
	"backend/handlers"

	"github.com/gin-gonic/gin"
)

type Handlers struct {
	ArticleHandler    *handlers.ArticleHandler
	SkillHandler      *handlers.SkillHandler
	ExperienceHandler *handlers.ExperienceHandler
	PortfolioHandler  *handlers.PortfolioHandler
	UploadHandler     *handlers.UploadHandler
	UserHandler       *handlers.UserHandler
}

func SetupRouter(handlers *Handlers) *gin.Engine {
	router := gin.Default()

	router.Static("/public", "./public")

	api := router.Group("/api/v1")
	{
		//article routes
		api.GET("/articles", handlers.ArticleHandler.GetArticles)
		api.GET("/articles/:slug", handlers.ArticleHandler.GetArticlesBySlug)

		//experience routes
		api.GET("/experiences", handlers.ExperienceHandler.GetExperiences)

		//portfolio routes
		api.GET("/portfolios", handlers.PortfolioHandler.GetPortfolios)
		api.GET("/portfolios/:slug", handlers.PortfolioHandler.GetPortfoliosBySlug)

		//skill routes
		api.GET("/skills", handlers.SkillHandler.GetSkills)

		//upload routes
		api.POST("/uploads", handlers.UploadHandler.UploadFile)

		api.POST("/login", handlers.UserHandler.Login)
		api.POST("/register", handlers.UserHandler.Register)

		protected := api.Group("/")
		protected.Use(auth.AuthMiddleware())
		{
			protected.POST("/articles", handlers.ArticleHandler.CreateArticles)
			protected.DELETE("/articles/:id", handlers.ArticleHandler.DeleteArticle)
			protected.PUT("/articles/:id", handlers.ArticleHandler.UpdateArticle)

			protected.POST("/experiences", handlers.ExperienceHandler.CreateExperiences)
			protected.DELETE("/experiences/:id", handlers.ExperienceHandler.DeleteExperiences)
			protected.PUT("/experiences/:id", handlers.ExperienceHandler.UpdateExperiences)

			protected.POST("/portfolios", handlers.PortfolioHandler.CreatePortfolios)
			protected.DELETE("/portfolios/:id", handlers.PortfolioHandler.DeletePortfolios)
			protected.PUT("/portfolios/:id", handlers.PortfolioHandler.UpdatePortfolios)

			protected.POST("/skills", handlers.SkillHandler.CreateSkills)
			protected.DELETE("/skills/:id", handlers.SkillHandler.DeleteSkills)
			protected.PUT("/skills/:id", handlers.SkillHandler.UpdateSkills)
		}
	}

	return router
}
