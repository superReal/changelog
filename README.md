# changelog
Creates a YML file with metadata of a change entry. Based on [Enquirer](https://github.com/enquirer/enquirer), the powerful Node.js library for creating interactive CLI prompts. 


### Settings

##### Destination
`./changelog/unreleased/`

##### File format
`%s-%s.yml`

| Value  | Description       |  Slugified |
|--------|-------------------|:----------:|
| `%1$s` | Jira ticket       |   `true`   |
| `%2$s` | Changelog message |   `true`   |


### Prompt

| Question          | Hint                                   |       Type     |
|-------------------|----------------------------------------|:--------------:|
| Changelog message | ... e.g. Bug ticket title              |     `text`     |
| Type of change    | ... use arrow-keys, <return> to submit | `autocomplete` |
| Jira ticket       | ... e.g. HD-987                        |     `text`     |
| Merge Request     | ... e.g. 790                           |     `text`     |
