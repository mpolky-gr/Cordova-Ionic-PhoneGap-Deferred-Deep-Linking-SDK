/**
 * Branch.IO SDK
 * -------------
 * Method usage:
 *     All methods are promisified, therefore you can call .then(successCallback, errorCallback) for any of the method
 *     called for executing success or error callbacks.
 */
var exec = require('cordova/exec');
var _API_CLASS = 'BranchSDK'; // SDK Class

/**
 * Execute SDK method using cordova.exec()
 *
 * @param  (String) method - The class method to execute.
 * @param  (Array) params  - Method parameter(s) to pass.
 *
 * @return (Promise)
 */
function execute(method, params) {

    params = ( ! params) ? [] : params;

    return new Promise(function (resolve, reject) {
        exec(function (res) {
            resolve(res);
        }, function (err) {
            reject(err);
        }, _API_CLASS, method, params);
    });

}

/**
 * Set listener callback for SDK method.
 *
 * @param  (String) method      - The class method to execute.
 * @param  (Function) callback  - The method listener callback.
 *
 * @return (Promise)
 */
function executeCallback(method, callback) {

    exec(callback, function (err) {
        console.error(err);
    }, _API_CLASS, method, []);

}

/**
 * @class Branch
 */
var Branch = function () {
    this.debugMode = false;
};

/**
 * Initialize the Branch instance.
 *
 * @return (Promise)
 */
Branch.prototype.initSession = function () {
    return execute('initSession');
};

/**
 * Set debug mode.
 * NOTE: Init session must be called first before using this method
 *
 * @param (Boolean) isEnabled. Default = false
 *
 * @return (Promise)
 */
Branch.prototype.setDebug = function (isEnabled) {

    isEnabled = (typeof isEnabled !== 'boolean') ? false : isEnabled;

    this.debugMode = isEnabled;

    return execute('setDebug', [isEnabled]);

};

/**
 * Retrieves the install session parameters.
 *
 * @return (Promise)
 */
Branch.prototype.getFirstReferringParams = function () {

    return execute('getFirstReferringParams');

};

/**
 * Retrieves the latest referring parameters.
 *
 * @return (Promise)
 */
Branch.prototype.getLatestReferringParams = function () {

    return execute('getLatestReferringParams');

};

/**
 * Sets the identity of a user and returns the data.
 *
 * @param (String) identity - A unique identifier for the user [REQUIRED]
 *
 * @return (Promise)
 *
 */
Branch.prototype.setIdentity = function (identity) {

    if (identity) {
        return execute('setIdentity', [identity]);
    } else {
        return new Promise(function (resolve, reject) {
            reject('Please set an identity');
        });
    }

};

/**
 * Logout from the current session. Replace session and identity IDs.
 *
 * @return (Promise)
 */
Branch.prototype.logout = function () {

    return execute('logout');

};

/**
 * Register custom events.
 *
 * @param (String) action - Name of the custom action
 * @param (Object) metaData - Data to pass with the action [OPTIONAL]
 *
 * @return (Promise)
 */
Branch.prototype.userCompletedAction = function (action, metaData) {

    var args = [action];

    if (metaData) {
        args.push(metaData);
    }

    return execute('userCompletedAction', args);

};

/**
 * Create an unverisal Branch object
 *
 * @params (Object) options
 *
 * @return (Promise)
 *
 * options:
 *    --------------------------------------------------------------
 *    |          KEY          |    TYPE    |      DESCRIPTION      |
 *    --------------------------------------------------------------
 *    |  canonicalIdentifier  |   String   | The object identifier |
 *    |         title         |   String   |   The object title    |
 *    |  contentDescription   |   String   |  Object description   |
 *    |    contentImageUrl    |   String   |     The image URL     |
 *    |  contentIndexingMode  |   String   |    Indexing Mode      |
 *    |                       |            |('private' or 'public')|
 *    |    contentMetadata    |   Object   |   Custom key/value    |
 *    --------------------------------------------------------------
 */
Branch.prototype.createBranchUniversalObject = function (options) {

    return new Promise(function (resolve, reject) {
        execute('createBranchUniversalObject', [options]).then(function () {

            var res = {
                message: 'success'
            };

            // Attach object functions
            /**
             * Register view count.
             *
             * @return (Promise)
             */
            res.registerView = function () {
                return execute('registerView');
            };

            /**
             * Generates a short url.
             *
             * @param (Object) options
             * @param (Object) controlParameters
             *
             * @return (Promise)
             *
             * options:
             *    --------------------------------------------------
             *    |    KEY    |    TYPE    |      DESCRIPTION      |
             *    --------------------------------------------------
             *    |  feature  |   String   |   The link feature    |
             *    |   alias   |   String   |    The link alias     |
             *    |  channel  |   String   |   The link channel    |
             *    |   stage   |   String   |    The link stage     |
             *    |  duration |    Int     |   The link duration   |
             *    --------------------------------------------------
             *
             * controlParameters:
             *    -------------------------------------------------------
             *    |         KEY        |    TYPE    |    DESCRIPTION    |
             *    -------------------------------------------------------
             *    |    $fallback_url   |   String   |   Fallback URL    |
             *    |    $desktop_url    |   String   |   Desktop URL     |
             *    |    $android_url    |   String   |   Android URL     |
             *    |      $ios_url      |   String   |     iOS URL       |
             *    |      $ipad_url     |   String   |    iPad URL       |
             *    |      $fire_url     |   String   |  Kindle Fire URL  |
             *    |  $blackberry_url   |   String   |   Blackberry URL  |
             *    | $windows_phone_url |   String   |  Kindle Fire URL  |
             *    -------------------------------------------------------
             */
            res.generateShortUrl = function (options, controlParameters) {

                return execute('generateShortUrl', [options, controlParameters]);

            };

            /**
             * Show the share dialog.
             *
             * @param (Object) options
             * @param (Object) controlParameters
             *
             * @return (Promise)
             *
             * options:
             *    --------------------------------------------------
             *    |    KEY    |    TYPE    |      DESCRIPTION      |
             *    --------------------------------------------------
             *    |  feature  |   String   |   The link feature    |
             *    |   alias   |   String   |    The link alias     |
             *    |  channel  |   String   |   The link channel    |
             *    |   stage   |   String   |    The link stage     |
             *    |  duration |    Int     |   The link duration   |
             *    --------------------------------------------------
             *
             * controlParameters:
             *    -------------------------------------------------------
             *    |         KEY        |    TYPE    |    DESCRIPTION    |
             *    -------------------------------------------------------
             *    |    $fallback_url   |   String   |   Fallback URL    |
             *    |    $desktop_url    |   String   |   Desktop URL     |
             *    |    $android_url    |   String   |   Android URL     |
             *    |      $ios_url      |   String   |     iOS URL       |
             *    |      $ipad_url     |   String   |    iPad URL       |
             *    |      $fire_url     |   String   |  Kindle Fire URL  |
             *    |  $blackberry_url   |   String   |   Blackberry URL  |
             *    | $windows_phone_url |   String   |  Kindle Fire URL  |
             *    -------------------------------------------------------
             */
            res.showShareSheet = function (options, controlParameters) {

                return execute('showShareSheet', [options, controlParameters]);

            };

            /**
             * Set on share sheet launched listener callback.
             *
             * @param (Function) callback
             */
            res.onShareSheetLaunched = function (callback) {

                executeCallback('onShareLinkDialogLaunched', callback);

            };

            /**
             * Set on share sheet dismissed listener callback.
             *
             * @param (Function) callback
             */
            res.onShareSheetDismissed = function (callback) {

                executeCallback('onShareLinkDialogDismissed', callback);

            };

            /**
             * Set on link share listener callback.
             *
             * @param (Function) callback
             */
            res.onLinkShareResponse = function (callback) {

                executeCallback('onLinkShareResponse', callback);

            };

            /**
             * Set on channel select listener callback.
             *
             * @param (Function) callback
             */
            res.onChannelSelected = function (callback) {

                executeCallback('onChannelSelected', callback);

            };

            /**
             * List item on Spotlight (iOS Only).
             */
            res.listOnSpotlight = function () {
                return execute('listOnSpotlight');
            };

            resolve(res);

        }, function (err) {
            reject(err);
        });
    });

};

/**
 * Retrieve the current reward balance.
 *
 * @return (Promise)
 */
Branch.prototype.loadRewards = function () {

    return execute('loadRewards');

};

/**
 * Redeem rewards to your account.
 *
 * @param (Int) value - The amount to redeem.
 * @param (String) bucket - The value containing the name of the referral bucket to attempt to redeem credits from. [OPTIONAL]
 *
 * @return (Promise)
 */
Branch.prototype.redeemRewards = function (value, bucket) {

    var params = [value];

    if (bucket) {
        params.push(bucket);
    }

    return execute('redeemRewards', params);

};

/**
 * Retrieve the entire history of credits and redemptions from the individual user.
 *
 * @return (Promise)
 */
Branch.prototype.creditHistory = function () {

    return execute('getCreditHistory');

};

module.exports = new Branch;
