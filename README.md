# Virtual tour module

[![Composer Ready](https://www.awema.pl/awema-pl/module-virtual-tour/status.svg)](https://www.awema.pl/)
[![Downloads](https://www.awema.pl/awema-pl/module-virtual-tour/downloads.svg)](https://www.awema.pl/)
[![Last version](https://www.awema.pl/awema-pl/module-virtual-tour/version.svg)](https://www.awema.pl/)


A virual tour to show basic interface instructions

## Documentation

[Russian](./docs/index.md)

## NPM scripts

Development mode `npm run watch` or simply `npm start`

Development mode for IE `npm run watch:legacy`

Production build `npm run build`

## Installation

Via Composer

``` bash
$ composer require awema-pl/module-virtual-tour
```

The package will automatically register itself.

You can publish the migration with:

```bash
php artisan vendor:publish --provider="AwemaPL\VirtualTour\Providers\VirtualTourServiceProvider" --tag="migrations"
```

After the migration has been published you can create the table for VirtualTour by running the migrations:

```bash
php artisan migrate
```

You can publish the config file with:

```bash
php artisan vendor:publish --provider="AwemaPL\VirtualTour\Providers\VirtualTourServiceProvider" --tag="config"
```


## Examples of use

```php
use AwemaPL\VirtualTour\Facades\VirtualTour;

VirtualTour::lowerStr('Some String'); // 'some string'

VirtualTour::count(); // 1
```

## Methods

#### example()

Description some example.

#### count()

Description some count.

#### validate(string $email)

Throws an `InvalidArgumentException` is email is invalid.

## Testing

You can run the tests with:

```bash
composer test
```

## Contributing

Please see [contributing.md](contributing.md) for details and a todolist.

## Security

If you discover any security related issues, please email :author_email instead of using the issue tracker.

## Credits

- [:author_name][link-author]
- [All Contributors][link-contributors]

## License

GNU General Public License v3.0. Please see the [license file](license.md) for more information.

[ico-version]: https://img.shields.io/packagist/v/awemapl/formbuilder.svg?style=flat-square
[ico-downloads]: https://img.shields.io/packagist/dt/awemapl/formbuilder.svg?style=flat-square
[ico-travis]: https://img.shields.io/travis/awemapl/formbuilder/master.svg?style=flat-square
[ico-styleci]: https://styleci.io/repos/12345678/shield

[link-packagist]: https://packagist.org/packages/awemapl/formbuilder
[link-downloads]: https://packagist.org/packages/awemapl/formbuilder
[link-travis]: https://travis-ci.org/awemapl/formbuilder
[link-styleci]: https://styleci.io/repos/12345678
[link-author]: https://github.com/awemapl
[link-contributors]: ../../contributors]
 