

## Updating Drupal Core

1. Run `composer update drupal/core --with-dependencies` to update Drupal Core and its dependencies.


## Deploying to Prod

1. Commit to the `master` branch and push.
2. SSH into server and cd to `public_html/tee-prop`.
3. Run `git pull`.
4. Run `/opt/imh/imh-php72/root/usr/bin/php /opt/cpanel/composer/bin/composer install`
    - This is necesary because InMotion Hosting makes it impossible to change the PHP version for CLI.
    We need version 7.2 and we're stuck with 7.0. We can specify which PHP version to use when running Composer
    with the above command.
6. Run `/home/megank9/public_html/tee-prop/vendor/drush/drush/drush updb -y`.
    - The same problem exists with Drush so we must specify the path to use Drush 9 instead of 7. 
    Drush 7 is installed globally with a global Composer but it cannot be updated due to server memory constraints.
5. Run `/home/megank9/public_html/tee-prop/vendor/drush/drush/drush cim sync` to import config.
7. Run `/home/megank9/public_html/tee-prop/vendor/drush/drush/drush cr`.
