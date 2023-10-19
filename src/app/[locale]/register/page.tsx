'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Image from 'next/image';
import icon from '@/app/icon.png';
import Alert from '@/components/Alert';
import { signUp } from '@/app/api';
import useRegistrationForm from '@/hooks/useRegistrationForm';

export default function Register() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    alert,
    setAlert,
    busy,
    setBusy,
    regSuccess,
    setRegSuccess,
  } = useRegistrationForm();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setAlert(null);
    const { error, message } = await signUp(
      username,
      password,
    );
    setBusy(false);
    if (error) {
      setAlert({
        message: error, type: 'error',
      });
    } else if (message) {
      setBusy(true);
      setAlert({
        message, type: 'success',
      });
      setRegSuccess(true);
    }
  };
  const passwordId = 'passwordField';
  const usernameId = 'usernameField';
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <div className="flex items-center">
            <Image alt="Note Taker Logo" src={icon} />
            <span className="text-5xl font-bold">Note Taker</span>
          </div>
          <p className="py-6 text-lg italic">{'Take the best notes you\'ve ever taken!'}</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" data-testid="form" onSubmit={onSubmit}>
            <div className="form-control">
              <label className="label" htmlFor={usernameId}>
                <span className="label-text">Username</span>
              </label>
              <input
                id={usernameId}
                // eslint-disable-next-line react/no-unknown-property
                data-testid="username"
                type="username"
                placeholder=""
                className="input input-bordered"
                required
                disabled={busy}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor={passwordId}>
                <span className="label-text">Password</span>
              </label>
              <input
                id={passwordId}
                data-testid="password"
                type="password"
                placeholder=""
                className="input input-bordered"
                required
                disabled={busy}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                disabled={busy}
                className="btn btn-success btn-outline"
              >
                Sign up
              </button>
            </div>
            {alert && (
            <div>
              <Alert message={alert.message} type={alert.type} />
            </div>
            )}
            {regSuccess && (
              <div className="form-control">
                <a
                  className="btn btn-primary"
                  href="/login"
                >
                  Take me there
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
