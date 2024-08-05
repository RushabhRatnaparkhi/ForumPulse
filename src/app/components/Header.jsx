'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

export default function Header() {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, settoggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, []);

    return (
        <header className="bg-red-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">ForumPulse</div>

                <nav className="flex items-center space-x-4">
                    {/* Desktop Navigation */}
                    <div className="sm:flex hidden items-center space-x-4">
                        <Link href="/blog" className="hover:underline">Blog</Link>
                        <Link href="/forum" className="hover:underline">Forum</Link>
                        <Link href="/about" className="hover:underline">About</Link>
                        <Link href="/contact" className="hover:underline">Contact</Link>
                        {session?.user ? (
                            <div className="flex items-center space-x-4">
                                <Link href="/create-prompt" className="black_btn">
                                    Create Post
                                </Link>
                                <button type="button" onClick={signOut} className="outline_btn">
                                    Sign Out
                                </button>
                                <Link href="/profile">
                                    <Image src={session?.user.image} alt="Profile" width={36} height={36} className="rounded-full" />
                                </Link>
                            </div>
                        ) : (
                            <>
                                {providers && Object.values(providers).map((provider) => (
                                    <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                                        Sign in
                                    </button>
                                ))}
                            </>
                        )}
                    </div>

                    {/* Mobile Navigation */}
                    <div className="sm:hidden flex relative">
                        {session?.user ? (
                            <div className="flex items-center">
                                <Image
                                    src={session?.user.image}
                                    alt="Profile"
                                    width={36}
                                    height={36}
                                    className="rounded-full"
                                    onClick={() => settoggleDropdown((prev) => !prev)}
                                />
                                {toggleDropdown && (
                                    <div className="dropdown">
                                        <Link
                                            href="/profile"
                                            className="dropdown_link"
                                            onClick={() => settoggleDropdown(false)}
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            href="/create-prompt"
                                            className="dropdown_link"
                                            onClick={() => settoggleDropdown(false)}
                                        >
                                            Create Prompt
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                settoggleDropdown(false);
                                                signOut();
                                            }}
                                            className="mt-5 w-full black_btn"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                {providers && Object.values(providers).map((provider) => (
                                    <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                                        Sign in
                                    </button>
                                ))}
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
