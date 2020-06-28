module.exports = (config) => {
  const { env } = config.utils;

  // Profile configuration
  const profile = {
    picture: {
      default: {
        male: '/assets/img/male.png',
        female: '/assets/img/female.png',
      },
      thumbnail: '100x100',
      accept: ['image/png', 'image/jpeg'],
    },
    protected_attrs: ['validations', 'salt', 'updated_at', 'created_at', 'provider', 'roles'],
    private_attrs: ['validations', 'salt', 'password'],
  };

  // Supported validations
  const validations = {
    types: ['admin', 'phone', 'email'].filter((one) => env.get(`${one.toUpperCase()}_ENABLED`)),
    config: {
      phone: {
        validate: env.get('PHONE_VALIDATE'),
        code_length: env.get('PHONE_CODE_LENGTH'),
        max_tries: env.get('PHONE_MAX_TRIES'),
        authenticate: env.get('PHONE_IS_AUTHENTICATE'),
        max_resends: env.get('PHONE_MAX_RESENDS'),
      },
      email: {
        validate: env.get('EMAIL_VALIDATE'),
        code_length: env.get('EMAIL_CODE_LENGTH'),
        max_tries: env.get('EMAIL_MAX_TRIES'),
        authenticate: env.get('EMAIL_IS_AUTHENTICATE'),
        max_resends: env.get('EMAIL_MAX_RESENDS'),
      },
      admin: {
        validate: env.get('ADMIN_VALIDATE'),
        code_length: env.get('ADMIN_CODE_LENGTH'),
        max_tries: env.get('ADMIN_MAX_TRIES'),
        authenticate: false,
        max_resends: env.get('ADMIN_MAX_RESENDS'),
      },
    },
  };

  validations.mondatory = Object.keys(validations.config).filter(
    (type) => validations.config[type].validate,
  );

  // Twilio configuration
  const twilio = {
    from: env.get('TWILIO_FROM'),
    accountID: env.get('TWILIO_ACCOUNT_SID'),
    authToken: env.get('TWILIO_AUTH_TOKEN'),
  };

  // sendGrid configuration
  const sendGrid = {
    key: env.get('SENDGRID_API_KEY'),
  };

  // SMTP mailer configuration
  const mailer = {
    from: env.get('MAILER_FROM'),
    options: {
      host: env.get('MAILER_HOST'),
      port: env.get('MAILER_PORT'),
      secure: env.get('MAILER_SECURE'),
      auth: {
        user: env.get('MAILER_AUTH_USER'),
        pass: env.get('MAILER_AUTH_PASS'),
      },
    },
  };

  // Return the module configuration
  return {
    mailer,
    twilio,
    sendGrid,
    validations,
    app: {
      profile,
      roles: {
        default: env.get('DEFAULT_GROUPS'),
      },
    },
  };
};
