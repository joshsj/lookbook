# Data

## Structures

|          | Name      | Type       | Description                                    |
| -------- | --------- | ---------- | ---------------------------------------------- |
| **User** | username  | `string`   |                                                |
|          | looks     | `string[]` | look IDs                                       |
| **Look** | owner     | `string`   | user ID                                        |
|          | title     | `string`   |                                                |
|          | fits      | `string[]` | fit IDs                                        |
|          | desc      | `string`   | a little info about it                         |
| **Fit**  | owner     | `string`   | user ID                                        |
|          | img       | `string`   | URL of image                                   |
|          | src       | `string`   | URL to place of discovery, e.g., Reddit, album |
|          | breakdown | `string[]` | description of each item                       |
