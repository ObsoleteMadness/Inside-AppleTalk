---
title: "Character Codes"
part: "Part V - End-User Services"
source: "Inside AppleTalk Second Edition (1990)"
source_url: "https://vintageapple.org/macbooks/pdf/Inside_AppleTalk_Second_Edition_1990.pdf"
pages: "562–597"
converted: "2026-04-05"
engine: "gemini-flash"
nav_order: 24
parent: "Inside AppleTalk, 2nd Edition"
layout: default
grand_parent: Books
---


# Appendix D Character Codes
1. TOC
{:toc}


Several AppleTalk protocols utilize character string entity names, which can be composed of any 8-bit characters. Their representations are exactly the same as those used by the Macintosh and are shown in *Table D-1* below.

#### **Table D-1** Character set mapping used in AppleTalk

![Character set mapping used in AppleTalk](images/p563-character-set-table.png)

| Second digit | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | A | B | C | D | E | F |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **0** | NUL | DLE | SPACE | 0 | @ | P | ` | p | Ä | ê | † | ∞ | ¿ | — | | |
| **1** | SOH | DC1 | ! | 1 | A | Q | a | q | Å | ë | ° | ± | ¡ | – | | |
| **2** | STX | DC2 | " | 2 | B | R | b | r | Ç | í | ¢ | ≤ | ¬ | “ | | |
| **3** | ETX | DC3 | # | 3 | C | S | c | s | É | ì | £ | ≥ | √ | ” | | |
| **4** | EOT | DC4 | $ | 4 | D | T | d | t | Ñ | î | § | ¥ | ƒ | ‘ | | |
| **5** | ENQ | NAK | % | 5 | E | U | e | u | Ö | ï | • | µ | ≈ | ’ | | |
| **6** | ACK | SYN | & | 6 | F | V | f | v | Ü | ñ | ¶ | ∂ | Δ | ÷ | | |
| **7** | BEL | ETB | ' | 7 | G | W | g | w | á | ó | ß | Σ | « | ◊ | | |
| **8** | BS | CAN | ( | 8 | H | X | h | x | à | ò | ® | Π | » | ÿ | | |
| **9** | HT | EM | ) | 9 | I | Y | i | y | â | ô | © | π | ... | | | |
| **A** | LF | SUB | * | : | J | Z | j | z | ä | ö | ™ | ∫ | — | | | |
| **B** | VT | ESC | + | ; | K | [ | k | { | ã | õ | ´ | ª | À | | | |
| **C** | FF | FS | , | < | L | \ | l | \| | å | ú | ¨ | º | Ã | | | |
| **D** | CR | GS | - | = | M | ] | m | } | ç | ù | ≠ | Ω | Õ | | | |
| **E** | SO | RS | . | > | N | ^ | n | ~ | é | û | Æ | æ | Œ | | | |
| **F** | SI | US | / | ? | O | _ | o | DEL | è | ü | Ø | ø | œ | | | |

— Stands for a nonbreaking space, the same width as a digit.

An implementation of the AppleTalk protocols such as NBP and ZIP that use character string names must often perform string comparison. Throughout AppleTalk, this comparison is done in a case-insensitive manner (that is, K = k), and it must also be done in a diacritical-sensitive manner (that is, e ≠ é ≠ è). The mapping in Table D-2 shows the rules for uppercase equivalence of characters in AppleTalk. For example, lowercase ç matches uppercase Ç in a string comparison. Any character that does not appear in this table has no uppercase equivalent in AppleTalk and therefore can only match itself. Note that this mapping does not exactly conform to the standards used in all human languages. In certain languages, the uppercase equivalent of é is E; in other languages (and in AppleTalk), it is É.

#### **Table D-2** Lowercase-to-uppercase mapping in AppleTalk

| Lowercase Value | Lowercase Character | Uppercase equivalent Value | Uppercase equivalent Character |
| :--- | :--- | :--- | :--- |
| $61 | a | $41 | A |
| $62 | b | $42 | B |
| ⋮ | ⋮ | ⋮ | ⋮ |
| $7A | z | $5A | Z |
| $88 | à | $CB | À |
| $8A | ä | $80 | Ä |
| $8B | ã | $CC | Ã |
| $8C | å | $81 | Å |
| $8D | ç | $82 | Ç |
| $8E | é | $83 | É |
| $96 | ñ | $84 | Ñ |
| $9A | ö | $85 | Ö |
| $9B | õ | $CD | Õ |
| $9F | ü | $86 | Ü |
| $BE | æ | $AE | Æ |
| $BF | ø | $AF | Ø |
| $CF | œ | $CE | Œ |


## Glossary

**AARP**: see AppleTalk Address Resolution Protocol.

**abort sequence**: 12-18 1's (one bits) at the end of an LLAP frame.

**access modes**: a set of permissions used by AFP to regulate access to a file; AFP supports four access modes: read, write, read-write, and none.

**access privileges**: the privileges given to or withheld from users to open and make changes to a directory and its contents. Through the setting of access privileges, you control access to the information that is stored on a file server.

**Acknowledge control packet**: an LLAP packet sent in response to an Enquiry control packet, indicating that the requested LLAP node number is already in use.

**Address Mapping Table (AMT)**: a collection of protocol-to-hardware address mappings for each protocol stack that a node supports. The AMT is updated by AARP to ensure that current addressing information is available.

**address resolution**: the translation of node addresses between different node-numbering schemes.

**ADSP**: see AppleTalk Data Stream Protocol.

**AEP**: see AppleTalk Echo Protocol.

**AFI**: see AppleTalk Filing Interface.

**AFP**: see AppleTalk Filing Protocol.

**AFP-file-system-visible entity**: a network-visible entity accessible through the AFI.

**AFP translator**: workstation software that translates native file system commands to AFP calls; the AFP translator obtains the commands from the NFI and translates them to the AFI for transmission over the network to a file server.

**ALO transaction**: see at-least-once transaction.

**AMT**: see Address Mapping Table.

**ancestor**: a directory that is along the path to a destination CNode (file or directory), known as the descendent.

**AppleTalk Address Resolution Protocol (AARP)**: the protocol that reconciles addressing discrepancies in networks that support more than one set of protocols. For example, by resolving the differences between an Ethernet addressing scheme and the AppleTalk addressing scheme, AARP facilitates the transport of DDP packets over a high-speed EtherTalk connection.

**AppleTalk Data Stream Protocol (ADSP)**: a connection-oriented protocol that provides a reliable, full-duplex, byte-stream service between any two sockets in an AppleTalk internet. ADSP ensures in-sequence, duplicate-free delivery of data over its connections.

**AppleTalk Echo Protocol (AEP)**: a simple protocol that allows a node to send a packet to any other node in an AppleTalk internet and to receive an echoed copy of that packet in return.

**AppleTalk Filing Interface (AFI):** the interface to an AFP file server through which workstations can gain access to server volumes, files, directories, and forks.

**AppleTalk Filing Protocol (AFP):** the presentation-layer protocol that allows users to share data files and application programs that reside in a shared resource, known as a file server.

**AppleTalk Session Protocol (ASP):** a general-purpose protocol that uses the services of ATP to provide session establishment, maintenance, and teardown, along with request sequencing.

**AppleTalk Transaction Protocol (ATP):** a transport protocol that provides a loss-free transaction service between sockets. This service allows exchanges between two socket clients in which one client requests the other to perform a particular task and to report the results; ATP binds the request and response together to ensure the reliable exchange of request-response pairs.

**ASP:** see AppleTalk Session Protocol.

**at-least-once (ALO) transaction:** an ATP transaction in which the request is repeated until a response is received by the requester or until a maximum retry count is reached. This recovery mechanism ensures that the transaction request is executed at least one time.

**ATP:** see AppleTalk Transaction Protocol.

**backbone network:** a central network to which a number of other smaller, usually lower-speed, networks connect; the backbone (or spine) network is usually constructed with a high-speed communication medium.

**backbone router:** one in a series of internet routers that are used to interconnect several AppleTalk networks through a backbone network.

**background spooler:** a print-spooling process that runs in the background on an originating computer.

**bitmap order:** when data is packed in bitmap order, the parameter corresponding to the least-significant set bit in the bitmap is packed first, followed by the parameter corresponding to the next most-significant set bit; packing continues in this manner, and the packet ends with the parameter corresponding to the most-significant set bit.

**bit stuffing:** a technique used to ensure that the unique bit pattern used to designate a flag byte (01111110) does not occur within the data packet. When bit stuffing is used, the link-level protocol (such as LLAP) inserts a 0 bit after every string of five consecutive 1 bits detected in the data stream being transmitted (the receiving LAP performs the inverse operation, stripping out each 0 bit that follows five consecutive 1 bits, in order to restore the data to its original state).

**broadcast hardware address (broadcast ID):** a hardware address common to all nodes on a data link; packets sent to this address will be delivered to every node on the data link. Broadcast hardware addresses facilitate broadcast transmissions.

**broadcasting:** delivery of a transmission to all active stations at the same time, such as over a bus-type local network.

**broadcast packet:** a packet intended to be received by all nodes in a network. In a LocalTalk implementation, broadcast packets are assigned a destination node identification number of 255 ($FF).

**broadcast protocol address**: an address that is accepted by all nodes that support a particular protocol stack; the broadcast protocol address facilitates the directed broadcast of packets to this subset of nodes.

**broadcast transmission dialog**: in a LocalTalk environment, the transmission of packets intended to be received by all nodes in the network. The source sends a lapRTS packet to the broadcast hardware address and then sends the data packet.

**bus**: a single, shared communication link. Messages are broadcast along the whole bus, and each network device listens for and receives messages directed to its unique address. The physical medium of a LocalTalk network is a twisted-pair bus.

**Carrier Sense Multiple Access with Collision Avoidance (CSMA/CA)**: a technique that allows multiple stations to gain access to a transmission medium (multiple access) by listening until no signals are detected (carrier sense), and then signaling their intent to transmit before transmitting. When contention occurs, transmission is based on a randomly selected order (collision avoidance). LLAP, used for node-to-node delivery in a LocalTalk environment, uses the CSMA/CA technique.

**catalog node (CNode)**: an entry (either a directory or a file) in a volume catalog of a disk. AFP recognizes two types of CNodes: internal CNodes, which are always directories, and leaf CNodes, which are located at the end of a limb in the tree-structured catalog and which can be either files or empty directories.

**CCITT**: see Consultative Committee on International Telephone & Telegraph.

**clear-to-send (CTS) control packet**: an LLAP packet sent in response to an RTS control packet, indicating the sending node's receipt of the RTS and its readiness to receive the data packet.

**client**: a software process that makes use of the services of another software process. See socket client.

**closed connection**: a connection that has been torn down. In a closed connection, neither end of the connection is established, so data transmission over the connection is no longer possible.

**CNode**: see catalog node.

**connection**: an association between two sockets that facilitates the establishment and maintenance of an exclusive dialog between two entities. See session.

**connection end**: in a connection, the communicating socket and the connection information associated with it.

**connection identifier (ConnID)**: an identification number associated with each connection; a connection provides a unique identifier by using the socket address and the ConnID of the two connection ends.

**connection-listening socket**: a socket that accepts open-connection requests and passes them along to its ADSP client for further processing.

**connection state**: the term used to refer collectively to control and state information that is maintained by the two ends of a connection.

**connection timer**: a timer that is started when a connection opens. When an end receives a packet from the other end, the timer is reset; the timer expires if the end does not receive any packets within a specified time period (if no data is being transmitted, tickling packets can be sent to keep the connection open). Connection timers are used by the AppleTalk session-layer protocols, such as PAP, ASP, and ADSP.

**ConnID**: see connection identifier.

**Consultative Committee on International Telephone & Telegraph (CCITT)**: a committee formed in 1938 that sets the international standards for the hardware and communications protocols for data and voice transmissions.

**control information (CI)**: the field in an ATP packet indicating the packet type and various control information, such as the end-of-message flag.

**control packets**: messages that do not contain data, but that are used for administrative purposes, such as enquiry, acknowledgment, and notification; control packets are also used to open and close connections.

**CRC**: see cyclic-redundancy check.

**CSMA/CA**: see Carrier Sense Multiple Access with Collision Avoidance.

**CTS**: see clear-to-send control packet.

**cyclic-redundancy check (CRC)**: an error-checking control technique that uses a polynomial algorithm to generate a 16-bit FCS based on the content of the frame. The FCS is appended to the end of each frame and is matched by the receiver to determine whether an error has occurred. LLAP uses the standard CRC-CCITT algorithm: G(x) = x^16 + x^{12} + x^5 + 1.

**DAS**: see dynamically assigned socket.

**datagram**: a self-contained packet, independent of other packets in a data stream. Since a datagram carries its own routing information, its reliable delivery does not depend on earlier exchanges between the source and destination devices. DDP is responsible for delivering AppleTalk transmissions as datagrams.

**Datagram Delivery Protocol (DDP)**: the network-layer protocol that is responsible for the socket-to-socket delivery of datagrams over an AppleTalk internet.

**data packets**: messages that contain client data.

**data transparency**: a technique of data transmission that allows data characters to be sent or received in any form, without regard to their possible interpretation as control characters. For example, to ensure that data containing six consecutive 1 bits is not interpreted as a flag byte, LLAP uses a data transparency mechanism known as bit stuffing. See bit stuffing.

**DDP**: see Datagram Delivery Protocol.

**default zone**: the zone to which any node on an extended network will automatically belong until a different zone is explicitly selected for that node.

**deny modes**: a set of AFP permissions that establishes what rights should be denied to users attempting to open a file fork that has already been opened by another user.

**DES**: data encryption standard published by the National Bureau of Standards (FIPS publication #46).

**descendent**: a destination CNode (an entry in a volume catalog of a disk); the directories along the path to the descendent are considered its ancestors.

**Desktop database**: a database used by a file server to hold information for use by the Macintosh Finder.

**Desktop file:** an invisible resource file that holds information for use by the Macintosh Finder.

**directed broadcast:** the transmission of a packet that is intended to be received by all nodes on a network other than the sender's network.

**directed packet:** a packet intended to be received by a single node.

**directed transmission dialog:** in a LocalTalk environment, the transmission of packets intended to be received by a single node. The source sends a lapRTS packet to the destination; the destination responds with a lapCTS packet; then the source sends the data packet.

**directory:** a construct for organizing information stored on a disk; disk directories can contain files and other directories. Each directory for a disk volume has an identifier, through which it and the files and other directories that it contains can be addressed. Sometimes called "folder."

**Directory ID:** a unique value that is assigned to each directory when it is created.

**duplicate transaction-request filtering:** an ATP process used to implement XO transaction service; in this process, the responder searches through a transactions list to determine whether the request has already been received. Duplicates are not delivered to ATP's client.

**dynamically assigned socket (DAS):** a socket assigned dynamically by DDP upon request from clients in the node. In an AppleTalk network, the sockets numbered 128–254 ($80–$FE) are allocated as DASs.

**dynamic node address assignment:** an addressing scheme that assigns node addresses dynamically, rather than associating a permanent address with each node. Dynamic node address assignment facilitates adding and removing nodes from the network by preventing conflicts between old node addresses and new node addresses.

**ELAP:** see EtherTalk Link Access Protocol.

**end of message (EOM):** a signal that indicates the end of a message. When the EOM bit is set in the header of a packet, it indicates that this packet is the last in a multipacket message, such as a multipacket ATP response or an ADSP data stream.

**Enquiry control packet:** an LLAP packet sent as part of the dynamic node number assignment algorithm, asking if any node on the link is currently using the specified LLAP node number.

**entity identifier:** the unique address of a network-visible entity's socket in a node within an internet. The specific format of an entity identifier is network-dependent.

**entity name:** a name that an NVE may assign itself. Although not all NVEs have names, NVEs can possess several names (or aliases). An entity name is made up of three character strings: object, type, and zone.

**entity type:** the part of an entity name that describes to what class the entity belongs; for example, "LaserWriter" or "AFPServer."

**entry state:** a variable associated with each entry in a routing table; three possible values for this variable are good, suspect, and bad.

**enumerate:** to list the offspring (files and directories) of a directory and selected parameters for those offspring.

**enumerator value:** a number used to distinguish among several entity names that are registered on the same socket. On a given socket, each entity name will have a unique enumerator value.

**EOM:** see end of message.

**EtherTalk:** Apple's data-link product that allows an AppleTalk network to be connected by Ethernet cables.

**EtherTalk Link Access Protocol (ELAP):** the link-access protocol used in an EtherTalk network. ELAP is built on top of the standard Ethernet data-link layer.

**exactly-once (XO) transaction:** an ATP transaction in which the request is delivered only one time, thus protecting against damage that could result from a duplicate transaction.

**extended AppleTalk network:** an AppleTalk network that allows addressing of more than 254 nodes and can support multiple zones.

**extended DDP header:** the DDP header type used for packets that are transmitted from one network to another network within an AppleTalk internet.

**FCS:** see frame check sequence.

**file:** a collection of related information that is stored on a disk. A file on a disk has a name through which it is accessible. Related files may be grouped together in a common directory. In the Macintosh file system and the AFI, a file is divided into two forks: a data fork and a resource fork.

**file server:** a computer running a specialized program that provides network users with access to shared disks or other mass storage devices. Through the implementation of access controls, a file server facilitates controlled access to common files and applications.

**Finder:** a Macintosh application that allows access to documents and other applications; the Finder uses icons to represent objects on a disk or volume. You use it to manage documents and applications and to get information to and from disks.

**flag byte:** a special bit pattern that is used in bit-oriented protocols to mark the beginning (and often the end) of a frame. The flag byte used as a frame delimiter in LLAP is the bit sequence 01111110 ($7E).

**flow quantum:** the maximum amount of data that can be transferred in a PAP transaction based on the buffer space available at the end that is issuing the read request.

**flush:** to write data from a cache in memory to a disk.

**FM-0:** a bit-encoding technique that provides self-clocking. LocalTalk implementations use FM-0 encoding.

**folder:** see directory.

**fork:** Macintosh files are divided into two parts, known as forks; the data fork is an unstructured finite sequence of data bytes. The resource fork is the part of a file that is accessible through the Macintosh Resource Manager and that contains specialized data used by an application, such as menus, fonts, and icons (as well as the application code for an application file).

**frame:** a group of bits forming a distinct transmission unit that is sent between data-link-layer entities. Each frame contains its own control information for addressing and error checking. The first several bits in a frame form a header that contains address and other control information, followed by the data (or message) being sent, and ending with a check sequence for error detection.

**frame check sequence (FCS):** a 16-bit sequence used for error checking that occurs at the end of each frame. In a LocalTalk implementation, the standard CRC-CCITT algorithm is used to compute the FCS. It is computed as a function of the contents of the destination node ID, source node ID, LLAP type, and data fields.

**frame preamble:** the part of an LLAP frame preceding the LLAP packet; specifically, 2 or more flag bytes.

**frame trailer:** the part of an LLAP frame following the LLAP packet; specifically, the FCS, trailing flag byte, and an abort sequence.

**gateways:** nodes that separate and manage communication between different types of networks; for example, a gateway is used to connect an AppleTalk protocol-based network to a non-AppleTalk protocol-based system. The gateway serves as a translator between the protocols of the two connected networks.

**global backoff mask:** a mask used by LLAP that takes on particular values to adjust the amount of time a node waits before transmitting in order to avoid collisions. The possible values in binary are: 0, 01, 011, 0111, 01111.

**guest:** a user who is logged on to a file server without a registered user name and password. A guest cannot own a directory. Guests receive whatever access privileges are assigned to "world."

**half-open connection:** a connection in which one end is established and the other end is closed, unreachable, or not yet open.

**half router:** an internet router used primarily to connect two remote AppleTalk networks. Each remote network contains an internet router that interconnects to the router attached to the other network through a long-distance communication link. This combination of two half-routers serves, in effect, as a single routing unit.

**hardware address:** the unique node address that is determined by the physical and data-link layers of the network.

**header:** the portion of a message, usually at the beginning of a packet, that contains control information, such as the source and destination addresses, packet-type identifiers, sequence numbers, and priority-level indicators.

**HFS:** see hierarchical file system.

**hierarchical file system (HFS):** the file system used on Macintosh hard disks and 800K floppy disks.

**history bytes:** two 8-bit bytes that are maintained by LLAP and that contain the number of times a node has deferred and the number of times it has sensed a collision in the last eight attempts to gain access to the link. These history bytes are used to determine the value of the random wait period.

**hop count:** the number of internet routers that a datagram passes through en route to its destination; each internet router is counted as 1 hop.

**IDG:** see interdialogue gap.

**IEEE 802.2:** The Institute of Electrical and Electronics Engineers standard defining service interfaces and packet formats for data-link service.

**IFG:** see interframe gap.

**interdialogue gap (IDG):** the minimum separation time between dialogues; for LLAP, 400 microseconds.

**interframe gap (IFG):** the maximum separation time between frames of a single dialogue; for LLAP, 200 microseconds.

**International Standards Organization-Open System Interconnection (ISO-OSI) reference model**: a seven-layer network architecture reference model established by the ISO and adhered to by the CCITT. The OSI model is intended to provide a common basis for coordinating the development of standards aimed at systems interconnection, while allowing existing standards to be placed in perspective within a common framework. The model represents a network as a hierarchical structure of layers of function; it segments the data communication concept into seven layers and defines the functionality of each layer. Each layer provides a set of functions accessible to the layer above it. In the "open" philosophy, the services provided by one layer to another are strictly defined, but the manner used to provide the services is left open to interpretation.

**internet**: one or more AppleTalk networks connected by intelligent nodes referred to as internet routers.

**internet router (IR)**: an intelligent node that connects AppleTalk networks and serves as the key component in extending the datagram delivery mechanism to an internet setting. An IR functions as a packet-forwarding agent to allow datagrams to be sent between any two nodes of an internet by using a store-and-forward process. AppleTalk internet routers fall into three categories: local routers, half routers, and backbone routers.

**internet socket address**: the address of a socket in an AppleTalk internet. This address is made up of the socket number and the node ID and network number of the node in which the socket is located; the internet address provides a unique identifier for any socket in an AppleTalk internet.

**IR**: see internet router.

**ISO-OSI reference model**: see International Standards Organization-Open System Interconnection reference model.

**LAP**: see Link Access Protocol.

**link**: any data transmission medium shared by a set of nodes and used for communication among these nodes.

**Link Access Protocol (LAP)**: a link-level protocol that is responsible for the transmission of data across the physical link and ensures data integrity on this link. Sometimes called "data-link access protocol." The LocalTalk Link Access Protocol (LLAP) is the LAP protocol used in a LocalTalk environment.

**LLAP**: see LocalTalk Link Access Protocol.

**LLAP type field**: a 1-byte LLAP field that indicates packet type. Values in the range 1-127 ($01-$7F) indicate that the packet is a data packet; the type field specifies the LLAP type of the client to whom the packet's data must be delivered. Values in the range 128-255 ($80-$FF) are reserved for control packets.

**local backoff mask**: similar to the global backoff mask; the local backoff mask is used by LLAP to extend the time period between delivery attempts to a nonlistening node, thereby increasing that node's chances of receiving the packet.

**local router**: an internet router used to connect AppleTalk networks that are in close proximity to each other; the local router is directly connected to each of the AppleTalk networks that it links.

**LocalTalk Link Access Protocol (LLAP)**: the link-level protocol that manages node-to-node delivery of data in a LocalTalk environment. LLAP manages bus access, provides a node-addressing mechanism, and controls data transmission and reception, ensuring packet length and integrity.

**long name**: the name used in AFP for a CNode (file or directory on a volume attached to a file server) so that the CNode can be recognized by a Macintosh workstation.

**LSB**: least-significant bit.

**maximum packet lifetime (MPL)**: the length of time that a packet is allowed to exist in the internet (for AppleTalk, approximately 30 seconds).

**missing clock**: the detection and then absence of clocking information. Used by LLAP transmitters to synchronize their access to the bus.

**mount**: the process of making a disk volume that is attached to a file server available to a workstation.

**MSB**: most-significant bit.

**multicast hardware address**: a destination hardware address common to a designated subset of nodes in a network; a packet with a multicast address as a destination is sent to all network nodes that can be identified by the multicast address. Multicast addresses facilitate directed broadcasts to a group of nodes.

**Name Binding Protocol (NBP)**: the AppleTalk transport-level protocol that translates a character string name into the internet address of the corresponding socket client; NBP enables AppleTalk protocols to understand user-defined zones and device names by providing and maintaining translation tables that map these names to corresponding socket addresses.

**name-lookup process**: the NBP process that binds the entity's name to its internet address.

**names directory (ND)**: a distributed database of entity-name to entity-internet-address mappings; the ND is the union of the individual names tables in all the nodes of an internet.

**names information socket (NIS)**: the NBP socket through which name lookup requests are received.

**names table**: a table in each node that contains entity-name to entity-internet-address mappings (known as NBP tuples) of all named NVEs in the node.

**native file system commands**: commands used to manipulate files on a diskette or other memory resource that is physically connected to a workstation.

**Native Filing Interface (NFI)**: the interface through which native file system commands are made; the NFI defines the nature and format of parameters passed in and returned by the command.

**NBP**: see Name Binding Protocol.

**ND**: see names directory.

**network number**: a 16-bit number used to indicate the AppleTalk network a node is connected to. Nodes choose their network number from within the network number range assigned to their network.

**network number range**: the range of network numbers that are valid for use by nodes on a given AppleTalk network.

**network-specific broadcast**: a broadcast intended only for those nodes with the indicated network number.

**network-visible entity (NVE):** resources that are addressable through a network. Typically, the NVE is a socket client for a service available in a node.

**network-wide broadcast:** a broadcast intended for all nodes on a given network.

**NFI:** see Native Filing Interface.

**NIS:** see names information socket.

**node:** a data-link addressable entity on a network.

**node ID:** see node identifier.

**node identifier (node ID):** an 8-bit number that, when combined with the AppleTalk network number of a node, is used to uniquely identify each node on a network.

**nonextended network:** an AppleTalk network that supports addressing of up to 254 nodes and supports only one zone.

**nonrouter node:** a network node that does not function as an internet router.

**NVE:** see network-visible entity.

**offspring:** each CNode (file or directory in a volume catalog) is considered the offspring of the CNode directly above it in the catalog tree; the higher CNode is called the parent (or parent directory).

**open connection:** an association that is set up between two sockets in which both ends have been established so that data can flow over the connection.

**open systems architecture:** a hardware or software architecture that is well defined and whose specifications are publicly available, allowing others to substitute component parts or form interconnections to other architectures.

**packet:** a group of bits, including data and control elements, that is transmitted together as a unit within a frame; the control elements include a source address, a destination address, and possibly error-control information.

**PAP:** see Printer Access Protocol.

**parent (or parent directory):** a directory is considered a parent to the CNode (file or directory) directly below it in the catalog tree; the lower CNode is called an offspring. The Parent ID is the Directory ID of the parent directory.

**password:** a unique string of characters that a user (or program) must supply in order to gain access to a network (or to a specific resource within the network); passwords are frequently encrypted prior to transmission to ensure network security.

**pathname:** the name of a CNode (file or directory) that specifies where the CNode belongs in the catalog tree. The pathname is formed by concatenating the directory names of all ancestor directories that make up the path.

**path type:** indicates whether the elements of the associated AFP pathname are all short names or all long names.

**permissions:** AFP access and deny modes that are used to regulate access to files. The AFP permission modes contribute to the synchronization rules that can prevent applications from damaging files through simultaneous access attempts.

**port descriptor:** information fields used to describe a router port; these fields include a flag that indicates whether the port is connected to an AppleTalk network, the port number, the router's address corresponding to the port, and the network number range for the network to which the port is connected.

**Printer Access Protocol (PAP)**: the AppleTalk protocol that manages interaction between workstations and print servers; PAP handles connection setup, maintenance, and termination, as well as data transfer.

**print spooler**: a hardware application or a software application (or both) that intercepts printable document files and that interacts with a printer to print the document, freeing the originating computer of this responsibility.

**probe**: a packet sent requesting acknowledgment from the remote end of a connection; the probe itself serves as an acknowledgment to the remote end.

**protocol**: a set of procedural rules for information exchange over a communication medium; these rules govern the content, format, timing, sequencing, and error control of messages exchanged in a network.

**protocol address**: the unique address that a node assigns to identify the protocol client that is to receive a packet for a particular protocol stack. An example of a protocol address is the 16-bit AppleTalk network number and 8-bit node ID protocol address that DDP and AARP use to verify that an incoming packet is intended for the particular DDP node.

**protocol family**: a collection of related protocols that correspond to the layers of the ISO-OSI reference model and that together enable transmission and reception of packets over a network. The combination of all AppleTalk protocols is an example of a protocol family.

**protocol stack**: a particular implementation of a protocol family within a node.

**provisional node address**: the address used by a node in the process of selecting its network number.

**pseudorandom numbers**: numbers picked via a mathematical process that approximates a truly random process.

**reception window size**: the amount of buffer space that a connection end has available for receiving incoming data.

**reply block**: the format of an AFP call that is sent from the file server to an AFP workstation client; the response to a command block.

**request block**: the format of an AFP call that is sent from the AFP workstation client to the file server.

**request control block (RqCB)**: an information block that an ATP responder maintains for each call for a request issued by its client; the RqCB contains information provided by the call, including all data pertinent to the buffers and to the client delivery mechanism.

**request-to-send (RTS) control packet**: an LLAP packet sent to inform all nodes on the link of a node's desire to transmit a data packet and to request the destination node to send back a CTS control packet.

**response control block (RspCB)**: an information block that an ATP responder maintains in nodes implementing the exactly-once mode of operation; the RspCB holds the information required to filter duplicate requests and to retransmit response packets.

**root**: the base or topmost directory in a volume catalog.

**router**: see internet router.

**routing seed**: the initial routing table set up by an internet router after it is first switched on.

**routing table:** a table, resident in each AppleTalk internet router, that serves as a mapping of the internet, specifying the path and distance (in hops) between the internet router and other networks. Routing tables are used to determine whether and where a router will forward a data packet. RTMP is used to update the routing tables.

**Routing Table Maintenance Protocol (RTMP):** the AppleTalk protocol used to establish and maintain the routing information that is required by internet routers in order to route datagrams from any source socket to any destination socket in the internet. Using RTMP, internet routers dynamically maintain routing tables to reflect changes in internet topology.

**routing tuple:** the last part of an RTMP Data packet; routing tuples consist of two values: the destination network number or range and the distance, in hop counts, from the sending internet router to the destination network.

**RqCB:** see request control block.

**RspCB:** see response control block.

**RTMP:** see Routing Table Maintenance Protocol.

**RTMP Stub:** a process that listens on the RTMP socket in nonrouter nodes and that, upon receiving an RTMP Data packet, copies the packet's origination network number range and node address into two variables associated with the nonrouter node; the network number range is copied to THIS-NET-RANGE, and the node address (network number and node ID) is copied to A-ROUTER.

**RTS:** see request-to-send.

**SAS:** see statically assigned socket.

**SCC:** see Zilog 8530 Serial Communications Controller.

**SDLC:** see Synchronous Data Link Control.

**seed router:** an internet router in an AppleTalk network that has the network number range built into its port descriptor. Each AppleTalk network must have at least one seed router. This router will define the network number range for the other routers in that network.

**send transaction status (STS) bit:** a bit in the header of an ATP TResp packet, requesting the receiver of that packet to resend the ATP TReq with the current bitmap.

**Serial Communications Controller (SCC):** see Zilog 8530 Serial Communications Controller.

**server node IDs:** one of two classes of node ID numbers; server node IDs fall within the range 128–254 ($80–$FE) and are used by network servers (such as printers, spoolers, and file servers).

**servers:** network nodes that provide a service to the other nodes in the network, such as shared access to a file system (a file server), control of a printer (a printer server), or storage of messages in a mail system (a mail server).

**server session socket (SSS):** a socket in a server to which all session-related packets are sent.

**session:** a logical connection between two network entities (typically, a workstation and a server) that facilitates establishment and maintenance of an exclusive dialog between the two entities. In an AppleTalk network, ASP can be used to establish, maintain, and tear down sessions; ASP also ensures that the commands transmitted during a session are delivered in the same order as they were sent and that the results of the commands are conveyed back to the originating entity. See connection.

**session identifier (session ID):** an identification number associated with each session; the session ID is unique among all the sessions to the same server; since multiple workstations can have sessions to the same server simultaneously, ASP uses session IDs to distinguish between commands received in these various sessions.

**session listening socket (SLS):** a socket in a server on which the server registers its name and listens for requests to open a session.

**session maintenance timeout:** a timeout period that occurs when one end of a session determines that the other end is unreachable because it has been unresponsive; when the session maintenance timeout occurs, ASP closes the session.

**short DDP header:** the DDP header type often used for packets whose source and destination sockets are within the boundaries of a single AppleTalk network. (An extended header is required for packets that are transmitted across network boundaries within an internet.)

**short name:** the name used in AFP for a CNode (file or directory on a volume attached to a file server) so that the CNode can be recognized by an MS-DOS workstation.

**SLS:** see session listening socket.

**SNAP:** Sub-Network Access Protocol; used to distinguish between different protocol families using IEEE 802.2 packets.

**socket:** an addressable entity within a node connected to an AppleTalk network; sockets are owned by software processes known as socket clients. AppleTalk sockets are divided into two groups, statically assigned sockets (SASs), which are reserved for clients such as AppleTalk core protocols, and dynamically assigned sockets (DASs), which are assigned dynamically by DDP upon request from clients in the node.

**socket client:** a software process or function implemented in a network node.

**socket listener:** code provided by a socket client to receive datagrams addressed to the socket.

**socket number:** an 8-bit number that identifies a socket. A maximum of 254 different socket numbers can be assigned in a node.

**sockets table:** a table that maintains an appropriate descriptor of each active socket listener in a node; the data structure for the sockets table is built and maintained by the code that implements DDP in the node.

**spooler/server:** a combination of hardware and software that stores documents sent to it over a network and manages the printing of those documents on a printer.

**SSS:** see server session socket.

**startup range:** the range from which a node selects the network number part of its provisional address if it has no other network number saved.

**statically assigned socket (SAS):** a socket that is permanently reserved for use by a designated process. In an AppleTalk network, SASs are the sockets numbered 1-127 ($01-$7F); they are reserved for use by specific socket clients and for low-level built-in network services.

**STS:** see send transaction status bit.

**synchronization pulse:** in LLAP, a transition period on the link that is followed by an idle period greater than 2 bit-times, resulting in a missing clock indication in all receiving nodes. Used to synchronize access to the link.

**synchronization rules**: rules used by file servers to control simultaneous file access. The synchronization rules used by AFP are based on a set of file-opening permissions: an access mode and a deny mode.

**Synchronous Data Link Control (SDLC)**: a data-link layer protocol for managing synchronous, code-transparent, serial-by-bit information transfer. SDLC transmission exchanges may be full duplex or half duplex over either a switched or nonswitched link. The configuration of the link may be point-to-point, multipoint, or loop. SDLC frame format is used in LocalTalk implementations.

**TCB**: see transaction control block.

**TID**: see transaction identifier.

**TokenTalk**: Apple's data-link product that allows an AppleTalk network to be connected by token ring cables.

**TokenTalk Link Access Protocol (TLAP)**: the link-access protocol used in a TokenTalk network. TLAP is built on top of the standard token ring data-link layer.

**transaction**: an exchange of information between a source and a destination client that accomplishes a particular action or result. In an AppleTalk environment, ATP provides a transaction service that enables a source client's request to be bound to the destination client's response.

**transaction bitmap**: the field in an ATP TReq packet indicating which ATP TResp packets are being requested.

**transaction control block (TCB)**: an information block that the ATP requester must maintain for retransmitting an ATP request and for receiving its responses.

**transaction identifier (TID)**: an identification number provided by ATP to bind together the request and response portions of a transaction.

**Transaction Release (TRel)**: an ATP packet sent in response to XO TResp, specifying that the entire response message was received; upon receiving the TRel, the transaction responder removes the RspCB.

**Transaction Request (TReq)**: an ATP packet sent to ask an ATP client to perform an action and to return a response.

**Transaction Response (TResp)**: an ATP packet sent in response to a TReq, specifying the results of the requested operation.

**transactions list**: a list that the ATP responder maintains of all the recently received transactions; this list is used to implement XO transaction service.

**TRel**: see Transaction Release.

**TReq**: see Transaction Request.

**TResp**: see Transaction Response.

**UAM**: see user authentication method.

**user authentication method (UAM)**: any procedure used by a server and workstation by which the server is convinced of the user's identity.

**user name**: a string of characters that uniquely identifies a user for login purposes; the user name is entered by the user and confirmed in a user-authentication database before the user is permitted to gain access to the network resource.

**user node IDs**: one of two classes of node ID numbers; user node IDs fall within the range 1-127 ($01-$7F) and are generally used by workstations.

**volume**: a file storage unit. Each disk attached to an AppleTalk file server is considered a volume, although some disks may contain multiple volumes.

**volume catalog**: a tree-structured catalog of the files and directories on a volume.

**Volume ID**: a session-unique value assigned by a file server to each of its volumes; AFP calls use the Volume ID to specify the desired volume.

**volume signature**: a 2-byte field in AFP calls that identifies the volume type; volumes are of three possible types: flat, fixed Directory ID, or variable Directory ID.

**workstation session socket (WSS)**: a socket in a workstation to which all session-related packets are sent.

**WSS**: workstation session socket.

**XO transaction**: see exactly-once transaction.

**Zilog 8530 Serial Communications Controller (SCC)**: an integrated circuit commonly used to provide controller services in an LLAP implementation.

**ZIP**: see Zone Information Protocol.

**ZIP bringback time**: a specified amount of time after a network is brought down in which the network can be brought up again with a new zone name.

**ZIS**: see zone information socket.

**ZIT**: see zone information table.

**zone**: an arbitrary subset of the nodes within an internet.

**Zone Information Protocol (ZIP)**: the AppleTalk session-layer protocol that is used to maintain and discover the internet-wide mapping of network number ranges to zone names; ZIP is used by NBP to determine which networks contain nodes which belong to a zone.

**zone information socket (ZIS)**: the statically assigned socket (SAS) in each internet router to which nodes address requests for zone information and through which the internet router responds to those requests.

**zone information table (ZIT)**: a complete network-range-to-zones-list mapping of the internet maintained by each internet router in an AppleTalk internet.

**zone multicast address**: a data-link-dependent multicast address at which a node receives the NBP broadcasts directed to its zone.

**zones list**: specifies the zone names that can be chosen by nodes on the network.

## The Apple Publishing System

Inside *AppleTalk*, Second Edition, was written, edited, and composed on a desktop publishing system using Apple® Macintosh® computers and Microsoft® Word. Proof pages were created on the Apple LaserWriter® printers; final pages were printed on a Varityper® VT600™. Line art was created using Adobe Illustrator™ and typeset on a Linotronic® 300. PostScript®, the LaserWriter page-description language, was developed by Adobe Systems Incorporated.

Text type and display type are Apple's corporate font, a condensed version of ITC Garamond®. Bullets are ITC Zapf Dingbats®. Some elements, such as program listings, are set in Apple Courier, a fixed-width font.

---

![Apple logo](images/p595-apple-logo.png)

## Inside AppleTalk, Second Edition

by Gursharan S. Sidhu, Richard F. Andrews, Alan B. Oppenheimer
Apple Computer, Inc.


## Inside AppleTalk, Second Edition

*The Official Publication from Apple Computer, Inc.*

Written by Gursharan S. Sidhu, technical director of Network Systems Development at Apple Computer, and two of Apple's senior staff engineers — Richard F. Andrews and Alan B. Oppenheimer — *Inside AppleTalk* provides an in-depth discussion of the protocol architecture of the AppleTalk network system. This Second Edition features completely updated, detailed descriptions of the AppleTalk protocols, including the enhancements of AppleTalk Phase 2, as well as a fundamental overview by Mr. Sidhu.

Key topics covered include:
* Physical and data-link alternatives
* Transmission between nodes via the LocalTalk® Link Access Protocol (LLAP), EtherTalk® Link Access Protocol (ELAP), and TokenTalk® Link Access Protocol (TLAP)
* Handling addressing differences with the AppleTalk Address Resolution Protocol (AARP)
* Facilitating end-to-end transmission of data via the Datagram Delivery Protocol (DDP), Routing Table Maintenance Protocol (RTMP), and AppleTalk Echo Protocol (AEP)
* Handling naming and data flow with the AppleTalk Transaction Protocol (ATP), Name Binding Protocol (NBP), and Zone Information Protocol (ZIP)
* Guaranteeing reliable, sequenced data delivery over the network via the Printer Access Protocol (PAP), AppleTalk Data Stream Protocol (ADSP), and AppleTalk Protocol (ASP) ![Barcode label](images/p596-barcode-label.png)
* End-user services with the AppleTalk Filing Protocol (AFP) and
* Appendixes that cover LocalTalk specifications, the LLAP procedural model, and AppleTalk parameters

*Inside AppleTalk, Second Edition* is the essential developer tool and programmer's compendium of AppleTalk protocols. With this reference volume, Apple Computer provides developers with the information they need to create applications for the AppleTalk network system.

Part of the Apple® Communications Library

Printed in U.S.A.

Apple Computer, Inc.
20525 Mariani Avenue
Cupertino, CA 95014
(408) 996-1010
TLX 171-576

Addison-Wesley Publishing Company

*The Official Publication from Apple Computer, Inc.*

**About the authors: Gursharan S. Sidhu** is technical director of Network Systems Development at Apple Computer where he has been architect of the AppleTalk network system and a variety of other products, including AppleShare® and the Macintosh® Hierarchical File System. He received his B.S. from the Indian Institute of Technology and his M.S. and Ph.D. from Stanford University. He has been at Apple since 1982. **Richard F. Andrews** and **Alan B. Oppenheimer**, both staff engineers in Apple's Network System Development department since 1983, have played lead roles in the design of the AppleTalk network system. Mr. Andrews, with a B.S.E.E. from The Cooper Union and an M.S.C.S. from U.C.L.A., was project leader for the AppleShare file server and led development of the AppleTalk Filing Protocol. Mr. Oppenheimer, who received his B.S. and M.S. from M.I.T., played a leading role in implementing the AppleTalk core protocols for the Macintosh and worked on the design and implementation of EtherTalk®.

Part of the Apple® Communications Library

### For more information
APDA™ provides a wide range of development products and documentation, from Apple and other suppliers, for programmers and developers who work on Apple equipment. For information about APDA, contact

APDA
Apple Computer, Inc.
20525 Mariani Avenue, Mailstop 33-G
Cupertino, California 95014 USA
(800) 282-APDA or (800) 282-2732

---
