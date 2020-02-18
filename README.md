
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


# Versions

# PHP

7.2

# Node

12.0.0

(Run `nvm use` in teeprop theme directory to set automatically)

# Theme

## Compiling SCSS to CSS

`gulp build-css`

## Minifying JS

`gulp build-js`

## Compiling/minifying SCSS and JS

`gulp build`

## Watching SCSS and JS

`gulp watch`

# Updating Drupal core and contrib modules

Drupal core and contrib modules should be updated using Composer.

Check for updates using Composer:

```composer outdated```

Check for security updates using Drush:

```drush pm:security```

## Update Drupal Core

Run:

```composer update drupal/core --with-dependencies```

```drush updb -y```

### Issues updating Drupal Core

#### "Your requirements could not be resolved to an installable set of packages"

If you run into an error like "Your requirements could not be resolved to an installable set of packages.",
you probably need to specifically include the dependencies that are listed as part of the error message. For example:

```composer update drupal/core doctrine/inflector nikic/php-parser sebastian/comparator --with-dependencies```

#### No changes after running composer update

If composer update finds no updates, run the following command to check if any dependencies 
prohibit updating. Get the version number by running `composer outdated`.

```composer prohibits drupal/core:[VERSION_NUMBER]```

After determining what has prohibited the update, include the dependency in the composer update command. For example:

```composer update drupal/core twig/twig symfony/http-foundation --with-dependencies```

### After updating Drupal Core

#### Run database updates, clear caches, export config

Often core updates will come with database update hooks that need to be run. Occasionally these update hooks
will result in the database being updated in a way that causes config to be overridden.

* Run database updates:

```drush updb -y; drush cr;```

* Check to make sure that the core update was applied properly (check the version number that returns):

```drush status;```

* Export config:

```drush cex vcs;```

* Examine the config export and make sure the changes seem related to the update hooks that ran before committing. 

## Update a contrib module

Run:

```composer update drupal/[MODULE_NAME]```

```drush updb -y```
