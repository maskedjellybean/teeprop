

## Updating Drupal Core

1. Run `composer update drupal/core --with-dependencies` to update Drupal Core and its dependencies.


## Deploying to Prod

1. Commit to the `master` branch and push.
2. SSH into server and cd to `public_html/tee-prop`.
3. Run `git pull`. It is not necessary to run any Composer commands because the vendor, core and module directories have been committed.
4. Run `/home/megank9/public_html/tee-prop/vendor/drush/drush/drush updb -y`.
    - InMotion Hosting makes it very hard to install a Drush version greater than 7 so we must specify the path to use Drush 9 instead of 7. 
    Drush 7 is installed globally with a global Composer but it cannot be updated due to server memory constraints.
5. Run `/home/megank9/public_html/tee-prop/vendor/drush/drush/drush cim sync` to import config.
6. Run `/home/megank9/public_html/tee-prop/vendor/drush/drush/drush cr`.
