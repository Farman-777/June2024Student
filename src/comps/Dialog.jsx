import React from "react";
import { Modal } from 'antd'


// https://ant.design/components/modal/

const Dialog = {

    convertMessageStringToHTML: (messageString) => {
        if (React.isValidElement(messageString)) {
            return <div
                style={{
                    width: '85%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    alignContent: 'flex-start'
                }}
            >
                {messageString}
            </div>
        } else {
            return <div
                style={{
                    width: '85%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    alignContent: 'flex-start'
                }}
                dangerouslySetInnerHTML={{ __html: messageString }}
            />
        }
    },

    message: (message, okCallback, title, zIndex) => {
        message = message || 'This is a message';
        message = Dialog.convertMessageStringToHTML(message)

        Modal.info({
            title: title,
            content: message,
            zIndex: (zIndex) ? zIndex : 1000,
            onOk() {
                if (typeof okCallback === 'function')
                    okCallback();
            }
        })
        return;
    },

    success: (message, okCallback, title, zIndex, width) => {
        message = message || 'This is a message';
        message = Dialog.convertMessageStringToHTML(message)

        Modal.success({
            title: title,
            content: message,
            zIndex: (zIndex) ? zIndex : 1000,
            width: (width) ? width : 400,
            onOk() {
                if (typeof okCallback === 'function')
                    okCallback();
            }
        })
    },

    error: (message, okCallback, title, zIndex) => {
        message = message || 'This is a message';
        message = Dialog.convertMessageStringToHTML(message)

        Modal.error({
            title: title,
            content: message,
            zIndex: (zIndex) ? zIndex : 1000,
            onOk() {
                if (typeof okCallback === 'function')
                    okCallback();
            }
        })
    },

    confirm: (message, okCallback, cancelCallback, title, zIndex, okText = "OK", cancelText = "Cancel", autoFocusButton = 'ok') => {
        message = Dialog.convertMessageStringToHTML(message)

        Modal.confirm({
            title: title,
            content: message,
            zIndex: (zIndex) ? zIndex : 1000,
            onOk() {
                if (typeof okCallback === 'function')
                    okCallback();
            },
            onCancel() {
                if (typeof cancelCallback === 'function') {
                    cancelCallback();
                }
            },
            okText: okText,
            cancelText: cancelText,
            autoFocusButton: autoFocusButton
        })
    },

    confirmation: (message, okCallback, cancelCallback, title, zIndex, okText = "Yes", cancelText = "No") => {
        message = Dialog.convertMessageStringToHTML(message)

        Modal.confirm({
            title: title,
            content: message,
            zIndex: (zIndex) ? zIndex : 1000,
            onOk() {
                if (typeof okCallback === 'function')
                    okCallback();
            },
            onCancel() {
                if (typeof cancelCallback === 'function') {
                    cancelCallback();
                }
            },
            okText: okText,
            cancelText: cancelText
        })
    }
}

export default Dialog;