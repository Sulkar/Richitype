-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: tutorial
-- ------------------------------------------------------
-- Server version	5.5.5-10.6.5-MariaDB-1:10.6.5+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `texte`
--

DROP TABLE IF EXISTS `texte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `texte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titel` varchar(100) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `texte`
--

LOCK TABLES `texte` WRITE;
/*!40000 ALTER TABLE `texte` DISABLE KEYS */;
INSERT INTO `texte` VALUES (1,'Wörter','Abend|Abende|acht|alle|alles|alt|älter|Ampel|antworten|Apfel|Äpfel|April|arbeiten|Arm|Ast|Äste|Aufgabe|Auge|August|Auto|Baby|baden|Ball|Bälle|Bank|Bauch|Bäuche|bauen|Baum|Bäume|Bein|bewegen|bewegt|bezahlen|Biene|Bild|Bilder|Birne|bitten|Blatt|Blätter|blau|bleiben|bleibt|Blume|blühen|blüht|Blüte|Boden|böse|braun|bringen|bringt|Brot|Brötchen|Brief|Bruder|Buch|bunt|Busch|Cent|Christbaum|Computer|danken|denken|Dezember|Dienstag|Donnerstag|drei|dunkel|Ei|Eier|eins|elf|Eltern|Ende|eng|Ente|Erde|essen|isst|Eule|Euro|fahren|fährt|fallen|fällt|Familie|fangen|fängt|Februar|fein|Feld|Felder|Fenster|finden|Finger|fliegen|fliegt|Flügel|flüssig|fragen|fragt|Frau|Freitag|fremd|Fremde|freuen|Freude|Freund|Freundin|frisch|Frucht|Frühling|füllen|Füller|fünf|Fuß|Garten|geben|gibt|gehen|geht|gelb|gelbe|Geld|Gelder|Gemüse|Gesicht|gestern|gesund|gesunde|Gras|Gräser|groß|größer|grün|gut|Haare|haben|hat|Hals|halten|hält|Hand|Hände|hart|härter|Hase|Haus|Häuser|Haut|Häute|Hecke|heiß|heißen|helfen|hilft|Hilfe|hell|Hemd|Hemden|Herbst|Herr|heute|Hexe|Himmel|hören|Hose|Hund|Hunde|hundert|Igel|Jahr|Januar|Juli|Junge|Juni|Käfer|Kalender|kalt|Kälte|Katze|kaufen|Kind|Kinder|Klasse|Kleid|Kleider|klein|kommen|können|kann|Kopf|Körper|krank|Kraut|Kräuter|Kuh|Kühe|laufen|läuft|laut|leben|lebt|legen|legt|leicht|leise|lernen|lesen|liest|Leute|Lexikon|Licht|lieb|lieben|liegen|liegt|machen|Mädchen|Mai|malen|Mann|Männer|März|Maus|Mäuse|Minute|Mittwoch|Monat|Montag|morgen|Mund|Münder|müssen|muss|Mutter|Nacht|Nächte|Name|Nase|Nebel|nehmen|nimmt|neu|neun|November|Obst|Ohr|Oktober|Onkel|Ostern|Papier|Pferd|Pferde|pflanzen|pflegen|pflegt|Pizza|Platz|Plätze|Pommes|Puppe|quaken|Quadrat|Raupe|rechnen|reden|Regen|reich|reisen|Rock|rollen|rot|Rücken|rufen|Saft|Säfte|sagen|sagt|Salz|Samstag|Sand|sandig|Satz|Sätze|schauen|scheinen|Schere|schlafen|schläft|schlagen|schlägt|Schmetterling|Schnee|schneiden|schnell|schön|schreiben|schreibt|schreien|Schuh|Schuhe|Schule|schwarz|Schwester|sechs|sehen|sieht|Seife|Sekunde|September|sieben|singen|singt|sitzen|sitzt|Sohn|sollen|Sommer|Sonne|Sonntag|Spagetti|sparen|spielen|Sport|Stängel|Stange|stehen|steht|stellen|Stift|still|Stirn|Strauch|Sträucher|Stunde|suchen|Tag|Tage|Tante|Tasche|Teddy|Tee|Telefon|Temperatur|Thermometer|Tier|Tochter|tragen|trägt|trinken|turnen|üben|übt|Uhr|Vater|Verkehr|versuchen|vier|Vogel|warm|Wärme|warten|waschen|wäscht|Wasser|Weg|Wege|Weihnachten|weiß|weit|werden|wird|Wetter|Wiese|Wind|Winde|Winter|Woche|wohnen|wollen|will|Wort|wünschen|Wurzel|Zahl|zählen|Zahn|Zähne|Zehe|zehn|zeigen|zeigt|Zeit|Zimmer|Zucker|zwei|Zwiebel|zwölf','001'),(2,'fj','fff jjj fff jjj|fff jjj fff jjj|fff jjj fff jjj|fff jjj fff jjj|fff jjj fff jjj|fff jjj fff jjj|jj ff jj ff jj ff|jj ff jj ff jj ff|jj ff jj ff jj ff|jj ff jj ff jj ff|jj ff jj ff jj ff|jj ff jj ff jj ff|fjf jfj|fjf jfj|fjf jfj|fjf jfj|fjf jfj|fjf jfj|fjf jfj|fjf jfj|fjf jfj|fjf jfj|fff jjj fff jjj|fff jjj fff jjj|fff jjj fff jjj|fff jjj fff jjj|fff jjj fff jjj|fff jjj fff jjj|jj ff jj ff jj ff|jj ff jj ff jj ff|jj ff jj ff jj ff|jj ff jj ff jj ff|jj ff jj ff jj ff|jj ff jj ff jj ff|fjf jfj|fjf jfj|fjf jfj|fjf jfj|fjf jfj|fjf jfj|fjf jfj|fjf jfj|fjf jfj|fjf jfj','002'),(3,'urk','uuu rrr uuu rrr|uuu rrr uuu rrr|uuu rrr uuu rrr|uuu rrr uuu rrr|uuu rrr uuu rrr|uuu rrr uuu rrr|rr uu rr uu rr uu|rr uu rr uu rr uu|rr uu rr uu rr uu|rr uu rr uu rr uu|rr uu rr uu rr uu|rr uu rr uu rr uu|uru rur|uru rur|uru rur|uru rur|uru rur|uru rur|uru rur|uru rur|uru rur|uru rur|uuu rrr uuu rrr|uuu rrr uuu rrr|uuu rrr uuu rrr|uuu rrr uuu rrr|uuu rrr uuu rrr|uuu rrr uuu rrr|urk ruk|urk ruk|urk ruk|urk ruk|urk ruk|urk ruk|urk ruk|urk ruk|urk ruk|urk ruk|rr uu rr uu rr uu|rr uu rr uu rr uu|rr uu rr uu rr uu|rr uu rr uu rr uu|rr uu rr uu rr uu|rr uu rr uu rr uu|urk ruk|urk ruk|urk ruk|urk ruk|urk ruk|urk ruk|urk ruk|urk ruk|urk ruk|urk ruk|uru rur|uru rur|uru rur|uru rur|uru rur|uru rur|uru rur|uru rur|uru rur|uru rur','003'),(4,'dk','dddd kkk|kkk dddkkk|kkk ddd|kkk|kkd ddk|kkd ddk|kkd ddk|kkd ddk|ffff|ddd|fff|jjjj|dfdfdf|jkjkjkjk|ddddkkk|kkkdddkkk|kkk ddd kkk|kkd ddk|kkd ddk|kkd ddk|kkd ddk|ffff|ddd|fff|jjjj|dfdfdf|jkjkjkjk|dddd kkk|kkk dddkkk|kkk ddd|kkk|kkd ddk|kkd ddk|kkd ddk|kkd ddk|ffff|ddd|fff|jjjj|dfdfdf|jkjkjkjk|dddd kkk|kkk dddkkk|kkk ddd kkk|kkd ddk|kkd ddk|kkd ddk|kkd ddk|ffff|ddd|fff|jjjj|dfdfdf|jkjkjkjk','004'),(5,'Sätze Englisch','Sarah and Ira drove to the store.|The ham, green beans, mashed potatoes, and corn are gluten-free.|My mother hemmed and hawed over where to go for dinner.|The mangy, scrawny stray dog hurriedly gobbled down the grain-free, organic dog food.|I quickly put on my red winter jacket, black snow pants, waterproof boots, homemade mittens, and handknit scarf.|The incessant ticking and chiming echoed off the weathered walls of the clock repair shop.|Nervously, I unfolded the wrinkled and stained letter from my long-dead ancestor.|Into the suitcase, I carelessly threw a pair of ripped jeans, my favorite sweater from high school, an old pair of tube socks with stripes, and $20,000 in cash.','005'),(6,'Der Braunbär','Der Braunbär ist eine Säugetierart aus der Familie der Bären. Der Braunbär hat mehrere Unterarten. Es gibt den europäischen Braunbär, den Grizzlybär und den Kodiakbär. Diese kommen in Eurasien und Nordamerika vor. Als eines der größten an Land lebenden Raubtiere der Erde spielt er in zahlreichen Mythen und Sagen eine wichtige Rolle, gleichzeitig wurde er als vermeintlicher Nahrungskonkurrent und potenzieller Gefährder des Menschen vielerorts dezimiert oder ausgerottet. So gibt es in West- und Mitteleuropa nur noch kleine Gruppen von Bären. Innerhalb des deutschen Sprachraums lebt nur in Österreich dauerhaft eine kleine Bärengruppe, in anderen Regionen des Alpenraums wandern gelegentlich Exemplare umher.','006'),(7,'Lachen','Auch wenn es sich leicht und lustig anfühlt, Lachen ist für den Körper vor allem schwere Arbeit. Denn zum Lachen braucht er sehr viele Muskeln. Die ganze Atem-Muskulatur, die Gesichtsmuskeln, die Schultern und der Oberkörper machen mit. Sogar der Bauch bewegt sich. Siebzehn Muskeln im Gesicht und bis zu achtzig im ganzen Körper bewegen wir, wenn wir lachen. Ein Muskel zwischen Ohr und Mundwinkel ist sogar speziell fürs Lachen da - der Lachmuskel. Warum nehmen wir diese Arbeit auf uns? Darüber denken wir nicht nach. Wir lächeln unwillkürlich und lachen, wenn wir uns freuen und glücklich sind. Manchmal kann man eigentlich gar nicht anders, man muss einfach kichern oder laut loslachen. Zwar findet jeder etwas Anderes lustig, aber die meisten von uns können über Witze, Grimassen, Scherzfragen oder lustige Filme lachen. Wer kitzelig ist, lacht auch dabei laut los. Hin und wieder sind wir auch ein bisschen schadenfroh, wenn anderen etwas Dummes passiert oder wir sie auf den Arm genommen haben. Manche Leute können sogar über sich selbst lachen, auch wenn sie sich gerade blamieren. Es gibt Wissenschaftler, die das Lachen untersuchen. Sie meinen, das Lachen sei angeboren und die Menschen hätten schon gelacht, noch bevor sie überhaupt gesprochen haben. Auch Babys lachen schon bald nach der Geburt, lange bevor sie zu sprechen beginnen. Sie stellen damit einen wichtigen Kontakt zu anderen Menschen her. Lachen steckt an und verbindet die Menschen miteinander. Wer viel lacht, streitet weniger. Lachen tut auch unserem Körper gut. Beim Lachen massiert das Zwerchfell die inneren Organe. Dabei werden von ganz vielen Stellen im Körper Glückshormone losgeschickt. Dann ist unser Körper glücklich. Je lustiger etwas ist, desto glücklicher ist er, bis uns vor Lachen die Tränen kommen oder wir vor Lachen regelrecht platzen. Medizinisch gesehen ist das Lachen eine besondere Form des Ausatmens. Man atmet ein und presst die Luft gegen den Widerstand der fast geschlossenen Stimmritze wieder aus. Dabei muss die Luft an dieser vorbei und es entsteht der typische Lachton. Weil wir beim Lachen tiefer atmen, wird der ganze Körper besser mit Sauerstoff versorgt. Das stärkt das Immunsystem, die Körperpolizei, die unseren Körper gegen Eindringlinge wie Bakterien und Viren schützt. Lachen macht also gesund und lässt uns sogar besser denken. Denn auch das Gehirn freut sich über diese Extra-Portion Sauerstoff. Neuerdings besuchen kranke Menschen sogar eine Lachtherapie, um wieder gesund zu werden. Dort übt man das Lachen auf Kommando. Therapeuten glauben, dass sie damit viele Krankheiten heilen können. Vielleicht könnten sich viele Erwachsene diese Therapie sparen, wenn sie sich ein Beispiel an den Kindern nehmen würden. Kinder lachen nämlich fünfunddreißig bis zu vierhundert Mal am Tag, Erwachsene nur zwanzig Mal. Ganz schön wenig, oder?','007');
/*!40000 ALTER TABLE `texte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tutorial'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-27 13:20:46
