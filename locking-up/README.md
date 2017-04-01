## Password Authentication with Mongoose : Account Locking


This task focuses on implementing secure username/password authentication for your Mongoose User models with bcrypt.  Here  we'll discuss how to prevent brute-force attacks by enforcing a maximum number of failed login attempts.

Quick Review
If you haven't done so already, I recommend you start with reading Part 1. However, if you're like me and usually gloss over the paragraph text looking for code, here's what our User model looked like when we left off:

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
As can be seen, there's not much too it - we hash passwords before documents are saved to MongoDB, and we provide a basic convenience method for comparing passwords later on.

Why do we Need Account Locking?
While our code from Part 1 is functional, it can definitely be improved upon. Hashing passwords will save your bacon if a hacker gains access to your database, but it does nothing to prevent brute-force attacks against your site's login form. This is where account locking comes in: after a specific number of failed login attempts, we simply ignore subsequent attempts, thereby putting the kibosh on the brute-force attack.

Unfortunately, this still isn't perfect. As stated by OWASP:

Password lockout mechanisms have a logical weakness. An attacker that undertakes a large numbers of authentication attempts on known account names can produce a result that locks out entire blocks of application users accounts.
The prescribed solution, then, is to continue to lock accounts when a likely attack is encountered, but then unlock the account after some time has passed. Given that a sensible password policy puts the password search space into the hundreds of trillions (or better), we don't need to be too worried about allowing another five guesses every couple of hours or so.

Requirements
In light of the above, let's define our account locking requirements:

A user's account should be "locked" after some number of consecutive failed login attempts
A user's account should become unlocked once a sufficient amount of time has passed
The User model should expose the reason for a failed login attempt to the application (though not necessarily to the end user)
Step 1: Keeping Track of Failed Login Attempts and Account Locks
In order to satisfy our first and second requirements, we'll need a way to keep track of failed login attempts and, if necessary, how long an account is locked for. An easy solution for this is to add a couple properties to our User model:

var UserSchema = new Schema({
    // existing properties
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    // new properties
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Number }
});
loginAttempts will store how many consecutive failures we have seen, and lockUntil will store a timestamp indicating when we may stop ignoring login attempts.

Step 2: Defining Failed Login Reasons
In order to satisfy our third requirement, we'll need some way to represent why a login attempt has failed. Our User model only has three reasons it needs to keep track of:

The specified user was not found in the database
The provided password was incorrect
The maximum number of login attempts has been exceeded
Any other reason for a failed login will simply be an error scenario. To describe these reasons, we're going to kick it old school with a faux-enum:

// expose enum on the model
UserSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
};
Please note that it is almost always a bad idea to tell the end user why a login has failed. It may be acceptable to communicate that the account has been locked due to reason 3, but you should consider doing this via email if at all possible.