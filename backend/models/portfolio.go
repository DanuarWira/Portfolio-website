package models

type Portfolio struct {
	Id            int64                   `json:"id"`
	Title         string                  `json:"title"`
	Slug          string                  `json:"slug"`
	Thumbnail     string                  `json:"thumbnail_url"`
	CategoryId    int64                   `json:"category_id"`
	Category      Category                `json:"category,omitempty"`
	Description   string                  `json:"description"`
	GalleryImages []PortfolioImage        `json:"gallery_images"`
	ContentBlocks []PortfolioContentBlock `json:"content_blocks"`
}
