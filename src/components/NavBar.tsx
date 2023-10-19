import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';
import { auth } from '@/util/auth';
import logo from '@/app/icon.png';
import profilePhoto from '../../public/Images/profilephoto.png';
import SignInOut from './SignInOut';

function Title() {
  const t = useTranslations('notes');
  return <span className="btn btn-ghost normal-case text-xl">{t('title')}</span>;
}

export default async function NavBar() {
  const session = await auth();
  const user = session?.user;
  if (!user) return null;
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Image alt="Note Taker logo" src={logo} height={30} />
        <Title />
      </div>
      <span>
        {user?.username}
      </span>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <button type="button" tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image alt="profile photo" src={profilePhoto} />
            </div>
          </button>
          <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li><SignInOut /></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
