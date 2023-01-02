-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 31, 2021 at 01:53 AM
-- Server version: 5.7.33
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `walldire_expressDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `no_business` int(11) DEFAULT NULL,
  `no_promotions` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `cycle` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `title`, `description`, `price`, `discount`, `no_business`, `no_promotions`, `duration`, `cycle`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(91, 'Marketing Package', '<div class=\"basicctoaction\"><a href=\"#\">Professional</a></div>Get Website TrafficGet Direct CallsGet ReviewsGet Walk-insGet SharesGet Social TrafficGet Videos LeadsGet Content LinksGet Custom BannerGet Email-list BuildingOffer Coupon', 49.59, 20.00, 5, -1, 12, 1, 1, '2019-05-08 10:58:09', '2019-09-07 07:43:24', NULL),
(92, 'Advertising Package', '<div class=\"basicctoaction\"><a href=\"#\">Advanced</a></div>Get Website TrafficGet Direct CallsGet ReviewsGet Walk-insGet SharesGet Social TrafficGet Videos LeadsGet Email-list BuildingOffer CouponsOffer Events<div class=\"basicctoactio', 59.99, 20.00, 3, -1, 6, 1, 1, '2019-05-08 10:58:09', '2019-09-07 07:43:33', NULL),
(162, 'Landing Page Package', '<div class=\"basicctoaction\"><a href=\"#\">Basic</a></div>Get Website TrafficGet Direct CallsGet ReviewsGet Walk-insGet SharesGet Social TrafficOffer Events<div class=\"basicctoaction\"><a href=\"#\">Tracking Reports</a></div>', 79.99, 20.00, 1, -1, 3, 1, 1, '2019-05-08 10:58:09', '2019-09-07 07:44:22', NULL),
(766, 'Free Link Building', '<div class=\"basicctoaction\"><a href=\"#\">Free</a></div>Get Website TrafficGet Direct CallsGet ReviewsGet Walk-insOffer Events<div class=\"basicctoaction\"><a href=\"#\">Tracking Reports</a></div>', 0.00, 0.00, 1, 1, -1, 1, 1, '2019-05-08 10:58:09', '2019-09-07 07:57:34', NULL),
(5132, 'Marketing Package One Time', 'Get Website TrafficGet Direct CallsGet ReviewsGet Walk-insGet SharesGet Social TrafficGet Videos LeadsGet Content LinksGet Custom BannerGet Email-list BuildingOffer CouponsOffer DealsOffer Events', 595.08, 20.00, 5, -1, 12, 1, 1, '2019-05-08 10:58:09', '2019-09-07 07:43:11', NULL),
(5640, 'Landing Page One Time', '<div class=\"basicctoaction\"><a href=\"#\">Basic</a></div>Get Website TrafficGet Direct CallsGet ReviewsGet Walk-insGet SharesGet Social TrafficOffer Events<div class=\"basicctoaction\"><a href=\"#\">Tracking Reports</a></div>', 239.97, 20.00, 1, -1, 3, 1, 1, '2019-05-08 10:58:09', '2019-09-07 07:05:10', NULL),
(5641, 'Advertising Package One Time', '<div class=\"basicctoaction\"><a href=\"#\">Advanced</a></div>Get Website TrafficGet Direct CallsGet ReviewsGet Walk-insGet SharesGet Social TrafficGet Videos LeadsGet Email-list BuildingOffer CouponsOffer Events<div class=\"basicctoactio', 359.94, 20.00, 3, -1, 6, 1, 1, '2019-05-08 10:58:09', '2019-09-07 07:43:48', NULL),
(6928, 'Link Building Package', NULL, 9.99, 20.00, 1, 0, 1, 1, 1, '2019-05-08 10:58:09', '2019-09-07 07:45:09', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6929;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
