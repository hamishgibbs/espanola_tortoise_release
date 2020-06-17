PROJDIR := ~/Documents/Personal/espanola_tortoise_release
RAW_DIR := ${PROJDIR}/data
DATA_DIR := ${PROJDIR}/processed_data
SITE_DIR := ${PROJDIR}/docs

R = /usr/local/bin/Rscript $^ $@


default: process_data build_website push_site

push_site: ${SITE_DIR}/index.html
	git -C docs/ add . 
	git -C docs/ commit -m "automatic site build"
	git config --global --add url."git@github.com:".insteadOf "https://github.com/"
	git -C docs/ push

build_website: ${SITE_DIR}/index.html ${DATA_DIR}/lines.rds ${DATA_DIR}/most_recent_points.rds ${DATA_DIR}/length_summary.rds

process_data: preprocess_data ${DATA_DIR}/lines.rds ${DATA_DIR}/most_recent_points.rds ${DATA_DIR}/length_summary.rds

preprocess_data: pull_data ${DATA_DIR}/preprocessed_data.rds

pull_data: 
	git pull

${DATA_DIR}/preprocessed_data.rds: ${PROJDIR}/preprocess_data.R ${RAW_DIR} pull_data
	${R}

${DATA_DIR}/lines.rds: ${PROJDIR}/create_lines.R ${DATA_DIR}/preprocessed_data.rds
	${R}

${DATA_DIR}/most_recent_points.rds: ${PROJDIR}/create_most_recent_points.R ${DATA_DIR}/preprocessed_data.rds
	${R}

${DATA_DIR}/length_summary.rds: ${PROJDIR}/create_length_summary.R ${DATA_DIR}/lines.rds
	${R}

${SITE_DIR}/index.html: ${PROJDIR}/build_website.R ${DATA_DIR}/lines.rds ${DATA_DIR}/length_summary.rds ${DATA_DIR}/most_recent_points.rds ${PROJDIR}/index.Rmd ${PROJDIR}/tortoise_comparison.Rmd ${PROJDIR}/about.Rmd
	${R}