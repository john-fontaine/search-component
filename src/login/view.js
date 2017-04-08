import styles from './styles.css';
import registerImage from './register.png';

import {
    a,
    button,
    div,
    form,
    h3,
    img,
    input,
    label,
    p,
    span,
} from '../utils/elements';

import Join from '../join/index';
import Icon from '../icon/index';

const view = (model, intents) =>

    div({ id: model.id, className: styles.loginForm },

        form({ id: model.form.id, className: styles.section },

            div({ className: styles.wrapper },

                input({
                    autocomplete: 'off',
                    className: styles.input,
                    id: model.form.username.id,
                    name: model.form.username.name,
                    placeholder: 'Username',
                    required: true,
                    type: 'text',
                }),

                Icon.createElement({
                    className: styles.icon,
                    name: 'account-nli',
                    style: { lineHeight: '40px' }
                })
            ),

            div({ className: styles.wrapper },

                input({
                    autocomplete: 'new-password', // Hack for Chrome
                    className: styles.input,
                    id: model.form.password.id,
                    name: model.form.password.name,
                    placeholder: 'Password',
                    required: true,
                    type: 'password',
                }),

                Icon.createElement({
                    className: styles.icon,
                    name: 'lock',
                    style: { lineHeight: '40px' }
                })
            ),

            button({
                className: styles.login,
                id: model.form.submit.id,
                onclick: intents.login
            }, `Login`),

            div({ className: styles.wrapper },

                label({ className: styles.label },

                    input({
                        type: 'checkbox',
                        checked: model.form.remember ? 'checked' : ''
                    }),

                    `Save username`
                )
            ),

            div({ className: styles.wrapper },

                a({
                    className: styles.forgot,
                    onclick: () => console.log('ForgotLoginModal')
                }, `Forgot your username/password?`)
            )
        ),

        div({ className: styles.section },

            img({ src: registerImage }),

            h3({ className: styles.title }, `Don't have an account yet?`),

            p({ className: styles.text }, `Create your new account in one simple form`),

            Join.createElement({ className: styles.join }, `Join now`)
        )
    );

export default view;
