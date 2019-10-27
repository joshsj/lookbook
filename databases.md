# Databases

All tables in [nebd](https://github.com/louischatriot/nedb#the-javascript-database) have a primary key `_id`.

## Users

- username: `String`
- looks: `_id[]` from `looks` table

## Looks

- title: `String`
- owner: `_id` from `users` table
- fits: `_id[]` from `fits` table

## Fits

- img: `String` Image URL
- src: `String` URL to place of discovery, e.g., Reddit post, Imgur album (optional)
- breakdown: `String[]` description of each item from the fit
