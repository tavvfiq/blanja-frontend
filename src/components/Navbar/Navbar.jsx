import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import Img from "../ImgWithContainer/ImgWithContainer";
import SearchBar from "../SearchBar/SearchBar";
import text from "../../assets/text.module.css";
import colors from "../../assets/colors.module.css";
import classname from "../../helpers/classJoiner";
import logo from "../../assets/img/logo.png";
import filter from "../../assets/img/filter.png";
import cart from "../../assets/img/cart.png";
import notification from "../../assets/img/bell.png";
import message from "../../assets/img/message.png";
import userDefault from "../../assets/img/default.png";

const Navbar = (props) => {
	return (
		<header className={classname(styles.navbar, colors.white)}>
			<Img
				key="logo"
				containerStyle={styles.logo}
				imgStyle={styles.logoImg}
				source={logo}
			/>
			<SearchBar />
			<Img
				key="filter"
				containerStyle={styles.filter}
				imgStyle={styles.filterImg}
				source={filter}
			/>
			<Img
				key="cart"
				source={cart}
				containerStyle={styles.cart}
				imgStyle={styles.cartImg}
			/>
			{props.isLoggedIn && props.token ? (
				<nav className={styles.navList}>
					<Img
						key="notification"
						source={notification}
						containerStyle={styles.navIcon}
						imgStyle={styles.navIconImg}
					/>
					<Img
						key="message"
						source={message}
						containerStyle={styles.navIcon}
						imgStyle={styles.navIconImg}
					/>
					<Img
						key="profile"
						source={userDefault}
						containerStyle={styles.profile}
						imgStyle={styles.profileImg}
					/>
				</nav>
			) : (
				<div className={styles.buttonContainer}>
					<button
						className={classname(
							styles.loginButton,
							text.descriptionText,
							colors.error
						)}
					>
						Login
					</button>
					<button
						className={classname(
							styles.signupButton,
							text.descriptionText,
							colors.white
						)}
					>
						Signup
					</button>
				</div>
			)}
		</header>
	);
};

Navbar.propTypes = {
	isLoggedIn: PropTypes.bool,
	token: PropTypes.string,
};

export default Navbar;
