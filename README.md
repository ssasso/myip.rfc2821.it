# myip.rfc2821.it
What's my IP Address?

Static site (served via Cloudflare pages) + AWS Lambda (web function) to report IP Address (v4 or v6).

`functions` uses Cloudflare Pages Functions to proxy any request coming from curl to the text based URL - https://tnmc6mz3wlkw8ccy.3sn.lambda-web.eu-central-1.on.aws/text
