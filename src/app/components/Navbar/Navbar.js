"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";

import Button from "../CustomUI/Button/Button";

function Navbar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Search",
      href: "/search",
      icon: "/images/search.png",
    },
    {
      name: "Destinations",
      href: "/destinations",
    },
    {
      name: "Blogs",
      href: "/blogs",
    },
    {
      name: "Tours",
      href: "/tours",
    },
    {
      name: "Calender",
      href: "/calendar",
    },
    {
      name: "Experiences",
      href: "/experiences",
    },
    {
      name: "About",
      href: "/about",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  //Handlers
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navBox}>
        <div className={styles.navLogo}>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Travel Tailor Logo"
              width={100}
              height={50}
            />
          </Link>
        </div>

        {/* Nav Items Desktop */}
        <div className={styles.navItemsDesktop}>
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`${styles.navItem} ${
                pathname.startsWith(item.href) ? styles.active : ""
              }`}
            >
              {item.icon && (
                <Image src={item.icon} alt={item.name} width={24} height={24} />
              )}
              <p>{item.name}</p>
            </Link>
          ))}
        </div>

        <div className={styles.navCta}>
          <Button varient="color" href="/contact">
            Start Planning
          </Button>
        </div>

        <div className={styles.navMenuIcon}>
          <button onClick={handleClick} className={styles.navMenuIconBtn}>
            <Image
              src="/images/menu.png"
              alt="Menu Icon"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>

      {/* Nav Items Mobile */}
      <AnimatePresence mode="wait">
        <motion.div
          className={`${styles.navItemsMobile} ${isOpen && styles.active}`}
          key={isOpen}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={styles.navItem}
              onClick={closeMenu}
            >
              {item.icon && (
                <Image src={item.icon} alt={item.name} width={24} height={24} />
              )}
              <p>{item.name}</p>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
