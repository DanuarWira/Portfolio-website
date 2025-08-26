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
		api.GET("/articles", articleHandler.GetArticles)
		api.POST("/articles", articleHandler.CreateArticles)
	}

	return router
}
