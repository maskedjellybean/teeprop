
## Pulling database from Prod to Local

* Run `drush sql-sync @tee-prop.prod @tee-prop.local`
    * WARNING: Never switch these arguments around or you may overwrite the production database.
    

## Pulling files from Prod to Local

* Run `drush rsync @tee-prop.prod:%files @tee-prop.local:%files`
    * WARNING: Never switch these arguments around or you may overwrite the production files.
    

## Updating Drupal Core

1. Run `composer update drupal/core --with-dependencies` to update Drupal Core and its dependencies.


## Deploying to Prod

1. Commit to the `master` branch and push.
2. SSH into server and cd to `public_html/tee-prop`.
3. Run `git pull`. It is not necessary to run any Composer commands because the vendor, core and module directories have been committed.
4. Run `drush updb -y`.
5. Run `drush cim sync` to import config.
6. Run `drush cr`.


## Using Drush Prod alias commands

* To clear caches on Prod:
    * Run `drush @tee-prop.prod cr`

* To import config on Prod:
    * Run `drush @tee-prop.prod cim sync`


## Info about Drush and Composer on InMotion Hosting

* Drush 9.5.2 has been installed globally via Composer at `/home/megank9/.composer/vendor/drush`.
* We have specified the path to the _project_ installation of Drush in `tee-prop.site.yml`, so that when we run a Drush command for the Prod alias, 
the project installation of Drush is used instead of the global.
