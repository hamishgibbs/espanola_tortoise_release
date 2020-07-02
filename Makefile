PROJDIR := ~/Documents/Personal/espanola_tortoise_release
RAW_DIR := ${PROJDIR}/data
DATA_DIR := ${PROJDIR}/processed_data
BUILD_DIR := ${PROJDIR}/build
SITE_DIR := ${PROJDIR}/docs

R = /usr/local/bin/Rscript $^ $@


default: process_data

push_site: ${SITE_DIR}/index.html
	git -C docs/ add .
	git -C docs/ commit -m "automatic site build"
	git -C docs/ push

build_website: ${SITE_DIR}/index.html ${DATA_DIR}/lines.rds ${DATA_DIR}/most_recent_points.rds ${DATA_DIR}/length_summary.rds

process_data: preprocess_data ${DATA_DIR}/lines.rds ${BUILD_DIR}/most_recent_points.json ${BUILD_DIR}/length_summary.json ${BUILD_DIR}/events.json

preprocess_data: pull_data ${DATA_DIR}/preprocessed_data.rds

pull_data:
	git pull

${DATA_DIR}/preprocessed_data.rds: ${PROJDIR}/preprocess_data.R ${RAW_DIR} pull_data
	${R}

${DATA_DIR}/lines.rds: ${PROJDIR}/create_lines.R ${DATA_DIR}/preprocessed_data.rds
	${R}

${BUILD_DIR}/most_recent_points.json: ${PROJDIR}/create_most_recent_points.R ${DATA_DIR}/preprocessed_data.rds
	${R}

${BUILD_DIR}/length_summary.json: ${PROJDIR}/create_length_summary.R ${DATA_DIR}/lines.rds
	${R}

${BUILD_DIR}/events.json: ${PROJDIR}/create_event_data.R ${DATA_DIR}/preprocessed_data.rds
	${R}

${SITE_DIR}/index.html: ${PROJDIR}/build_website.R ${DATA_DIR}/lines.rds ${DATA_DIR}/length_summary.rds ${DATA_DIR}/most_recent_points.rds ${PROJDIR}/index.Rmd ${PROJDIR}/tortoise_comparison.Rmd ${PROJDIR}/about.Rmd
	${R}
