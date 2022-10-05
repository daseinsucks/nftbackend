## Local Development:
- npm install
- set the environment variables
- node server.js

## Environment Variables

Required:
```
ENVIRONMENT=development|production
NETWORK_NAME=ropsten|main
INFURA_ID=2446a0bac63140ba935ff73b34e27992
ADDRESS_MASTER_FACTORY=string
ADDRESS_MSNFT=string
PORT=number
MONGODB_CUSTOM_CONNECTION=true|false
```
For development environment use NETWORK_NAME = ropsten, otherwise main.<br>
Recent addresses (master factory and msnft) here: https://github.com/MoonSHRD/UniversalNFTMarketplace/blob/master/ropsten_addresses.txt

if `MONGODB_CUSTOM_CONNECTION=true`, then necessary:
```angular2html
MONGODB_URL=mongodb+srv://admin:2Kj4tgfXWAkcdQfb@tokens.b1djz.mongodb.net/mnshrdTest?retryWrites=true&w=majority
```
or use your own mongodb_url link.

if not, then necessary:
```
DB_MONGO_USER=root
DB_MONGO_PASSWORD=5454e9f322ac4c8562d9a1ec48f50a1b
DB_MONGO_HOST=master_moon_mongo
DB_MONGO_PORT=27017
DB_MONGO_DATABASES=mooonshard
```

## Access
- If you need access to the dev/staging server, you need to contact @BruAPAHE

## Logs
- Connect to `root@51.158.68.141` via ssh
- `docker ps`
- `docker logs -f {container_name}`

## Connect to db
- Use MongoDB Compass

Options:

  | Parameter  | Value |
  | ------------- | ------------- |
  | Hostname  | 51.158.68.141  |
  | Port  | 27018  |
  | SRV Record  | False  |
  | Authentication | Username / Password [(see them here)](https://github.com/MoonSHRD/infra/blob/dev/deploy/mongo/.env) |
  | Authentication Database | admin |

More options:

  | Parameter  | Value |
  |------------- | ------------- |
  | Read Preference  | Primary  |
  | SSL  | None  |
  | SSH Tunnel  | Use Identity File  |
  | SSH Tunnel Port | 22 |
  | SSH Username | root |
  | SSH Identity File | ***your id_rsa*** |
  | SSH Passphrase | ***password of id_rsa*** |