PROJDIR := ~/Documents/Personal/espanola_tortoise_release
RAW_DIR := ${PROJDIR}/data
DATA_DIR := ${PROJDIR}/processed_data
SITE_DIR := ${PROJDIR}/docs

R = /usr/local/bin/Rscript $^ $@


default: process_data build_website push_site

push_site: ${SITE_DIR}/index.html
	git add . 
	git commit -m "automatic site build"
	git push

build_website: ${SITE_DIR}/index.html

process_data: ${DATA_DIR}/preprocessed_data.rds ${DATA_DIR}/lines.rds ${DATA_DIR}/most_recent_points.rds ${DATA_DIR}/length_summary.rds

${DATA_DIR}/preprocessed_data.rds: ${PROJDIR}/preprocess_data.R ${RAW_DIR}
	${R}

${DATA_DIR}/lines.rds: ${PROJDIR}/create_lines.R ${DATA_DIR}/preprocessed_data.rds
	${R}

${DATA_DIR}/most_recent_points.rds: ${PROJDIR}/create_most_recent_points.R ${DATA_DIR}/preprocessed_data.rds
	${R}

${DATA_DIR}/length_summary.rds: ${PROJDIR}/create_length_summary.R ${DATA_DIR}/lines.rds
	${R}

${SITE_DIR}/index.html: ${PROJDIR}/build_website.R ${DATA_DIR}/lines.rds ${DATA_DIR}/length_summary.rds ${PROJDIR}/index.Rmd ${PROJDIR}/tortoise_comparison.Rmd ${PROJDIR}/about.Rmd
	${R}