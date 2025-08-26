package repositories

import (
	"backend/models"
	"database/sql"
	"strconv"
)

type ArticleRepository interface {
	FindAll() ([]models.Article, error)
	Save(article models.Article) (models.Article, error)
}

type articleRepository struct {
	db *sql.DB
}

func NewArticleRepository(db *sql.DB) ArticleRepository {
	return &articleRepository{db: db}
}

func (r *articleRepository) FindAll() ([]models.Article, error) {
	rows, err := r.db.Query("SELECT a.id, a.title, a.content, a.thumbnail_url, c.id as category_id, c.name as category_name FROM articles a LEFT JOIN categories c ON a.category_id = c.id ORDER BY a.created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var articles []models.Article
	for rows.Next() {
		var article models.Article
		var articleID int64
		var categoryID sql.NullInt64
		var categoryName sql.NullString

		if err := rows.Scan(
			&articleID,
			&article.Title,
			&article.Content,
			&article.Thumbnail,
			&categoryID,
			&categoryName,
		); err != nil {
			return nil, err
		}

		article.Id = strconv.FormatInt(articleID, 10)
		if categoryID.Valid {
			article.Category.Id = categoryID.Int64
		}
		if categoryName.Valid {
			article.Category.Name = categoryName.String
		}

		articles = append(articles, article)
	}

	return articles, nil
}

func FindById() {

}

func (r *articleRepository) Save(article models.Article) (models.Article, error) {
	query := "INSERT INTO articles (title, content, thumbnail_url, category_id) VALUES ($1, $2, $3, $4) RETURNING id"
	var newId int64
	err := r.db.QueryRow(query, article.Title, article.Content, article.Thumbnail, article.CategoryId).Scan(&newId)
	if err != nil {
		return models.Article{}, err
	}
	article.Id = strconv.FormatInt(newId, 10)
	return article, nil
}

func (r *articleRepository) Delete() {

}

func (r *articleRepository) Update() {

}
