package models

import "time"

type Experience struct {
	Id          int64      `json:"id"`
	JobTitle    string     `json:"job_title"`
	CompanyName string     `json:"company_name"`
	Description string     `json:"description"`
	StartDate   time.Time  `json:"start_date"`
	EndDate     *time.Time `json:"end_date"`
}

type ExperienceResponse struct {
	Id          int64  `json:"id"`
	JobTitle    string `json:"job_title"`
	CompanyName string `json:"company_name"`
	Description string `json:"description"`
	StartDate   string `json:"start_date"`
	EndDate     string `json:"end_date"`
}
