'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Image from 'next/image';
import icon from '@/app/icon.png';
import { signIn } from 'next-auth/react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = () => {
    signIn('credentials', {
      callbackUrl: '/notes',
      username,
      password,
    });
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
          <form className="card-body" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div className="form-control">
              <label className="label" htmlFor={usernameId}>
                <span className="label-text">Username</span>
              </label>
              <input
                id={usernameId}
                type="username"
                placeholder=""
                className="input input-bordered"
                required
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
                type="password"
                placeholder=""
                className="input input-bordered"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-warning btn-outline">Login</button>
            </div>
            <div className="form-control mt-6">
              <span>
                First time?
                {' '}
                <a className="btn-link" href="/register">Sign up</a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
