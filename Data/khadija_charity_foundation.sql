-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2023 at 09:15 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `khadija_charity_foundation`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `comment` text,
  `user_comment` int(11) DEFAULT NULL,
  `post_comment` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `comment`, `user_comment`, `post_comment`) VALUES
(1, 'adsklf;asdlfk', 1, 17),
(2, 'jkfhasdkjfasd', 1, 17),
(3, 'jkfhasdkjfasdxjhskjdfhasd', 1, 17),
(4, 'asdlkfjalksd', 1, 16);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `post_Image` text,
  `post_title` varchar(255) DEFAULT NULL,
  `post_description` text,
  `post_phone` varchar(20) DEFAULT NULL,
  `post_address` varchar(255) DEFAULT NULL,
  `post_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `post_Image`, `post_title`, `post_description`, `post_phone`, `post_address`, `post_user`) VALUES
(16, 'https://res.cloudinary.com/dskt3xxtq/image/upload/v1680913722/uploads/zlnqwuvm2vbpvmy4epak.jpg', 'Help', 'Try To Help people it is better to be patient', '0987654321', 'None', 1),
(17, 'https://res.cloudinary.com/dskt3xxtq/image/upload/v1681108740/uploads/jazx3isubbwhgla9pztk.png', 'Try', 'This is kabul', '0987654321', 'Kabul', 1);

-- --------------------------------------------------------

--
-- Table structure for table `slideshow`
--

CREATE TABLE `slideshow` (
  `slide_id` int(11) NOT NULL,
  `slide_title` varchar(200) DEFAULT NULL,
  `slide_descrption` text,
  `slide_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `slideshow`
--

INSERT INTO `slideshow` (`slide_id`, `slide_title`, `slide_descrption`, `slide_image`) VALUES
(8, 'Help People', 'Help More People Help More People Help More People Help More People ', 'https://res.cloudinary.com/dskt3xxtq/image/upload/v1680914675/uploads/hhrwr2oxu7ybzkqc9jrq.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(200) DEFAULT NULL,
  `user_email` varchar(200) DEFAULT NULL,
  `user_password` text,
  `user_type` varchar(100) DEFAULT NULL,
  `user_image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`, `user_type`, `user_image`) VALUES
(1, 'Hamza', 'Hamza.Nawabi119@gmail.com', '$2a$10$owvfLC/PbcxmASNc8XXHfuDADp.y6.iYJWXVSpfe1lCPsqvUNjPPy', 'Super Admin', 'https://res.cloudinary.com/dskt3xxtq/image/upload/v1680908933/uploads/uzzflevsdgehg5cikiuf.jpg'),
(5, 'wahid', 'wahid@gmail.com', '$2a$10$q.4387fBE1ppHCUFmJYF9.eOT9yMlOEqNjD5w.6StCSuzrVxdb3TC', 'Admin', 'https://res.cloudinary.com/dskt3xxtq/image/upload/v1680914976/uploads/hxxdwk5sc1fiadxa3g77.jpg'),
(6, 'sahil', 'sahil@gmail.com', '$2a$10$cY3eixebUXc7vgOacWd5Se7fVgLyWj9ruT2Zjod.Lw5n7EIc1sW/y', 'User', 'https://res.cloudinary.com/dskt3xxtq/image/upload/v1680669621/uploads/ltkwuzpp9ubyicxv7wrj.jpg'),
(7, 'naimat', 'naimat10nawabi@gmail.com', '$2a$10$uW.RDN4/JgBwwViNh5QNXOq74ZbICz0q1IQ40pSqnuI.vsrMQBFoi', 'Super Admin', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `user_comment` (`user_comment`),
  ADD KEY `post_comment` (`post_comment`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `post_user` (`post_user`);

--
-- Indexes for table `slideshow`
--
ALTER TABLE `slideshow`
  ADD PRIMARY KEY (`slide_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `slideshow`
--
ALTER TABLE `slideshow`
  MODIFY `slide_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_comment`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_comment`) REFERENCES `posts` (`post_id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`post_user`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
