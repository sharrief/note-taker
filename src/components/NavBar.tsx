import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';
import { auth } from '@/util/auth';
import logo from '@/app/icon.png';
import profilePhoto from '../../public/Images/profilephoto.png';
import SignInOut from './SignInOut';

const SignedInAs = async () => {
  const session = await auth();
  const user = session?.user;
  // if (!user) return null;
  return (
    <span>
      {user?.username}
    </span>
  );
};

export default function NavBar() {
  const t = useTranslations('notes');
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Image alt="Note Taker logo" src={logo} height={30} />
        <span className="btn btn-ghost normal-case text-xl">{t('title')}</span>
      </div>
      <SignedInAs />
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <button type="button" tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image alt="profile photo" src={profilePhoto} />
            </div>
          </button>
          <button type="button" tabIndex={0}>
            <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <SignInOut />
            </ul>
          </button>
        </div>
      </div>
    </div>
  );
}
