package routes

import (
	"backend/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRouter(articleHandler *handlers.ArticleHandler) *gin.Engine {
	router := gin.Default()

	router.Static("/public", "./public")

	api := router.Group("/api/v1")
	{
		//article routes
		api.GET("/articles", articleHandler.GetArticles)
		api.GET("/articles/:slug", articleHandler.GetArticlesBySlug)
		api.POST("/articles", articleHandler.CreateArticles)
		api.DELETE("/articles/:id", articleHandler.DeleteArticle)
		api.PUT("/articles/:id", articleHandler.UpdateArticle)

		//experience routes

		//portfolio routes

		//skill routes
	}

	return router
}
