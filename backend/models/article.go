package models

type Article struct {
	Id         string   `json:"id"`
	Title      string   `json:"title"`
	Content    string   `json:"content"`
	Thumbnail  string   `json:"thumbnail_url"`
	CategoryId int64    `json:"category_id"`
	Category   Category `json:"category,omitempty"`
}
