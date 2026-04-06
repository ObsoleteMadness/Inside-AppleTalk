---
title: "Operational Overview"
source: "C0144LLA_AppleTalk_Phase_2_Protocol_Specification_Addendum_1989"
source_url: ""
pages: "13–18"
converted: "2026-04-04"
engine: "gemini-flash"
nav_order: 3
parent: "Phase 2 Addendum"
layout: default
grand_parent: Books
---

# Chapter 3 Operational Overview
1. TOC
{:toc}


THE IMPLEMENTATION of extended addressing involves the following sequence of operations:

- obtaining a provisional address
- obtaining network information
- checking the validity of the provisional address and zone
- distinguishing between packets intended for delivery on the local network and those to be sent to a router for internet delivery

These operations are summarized below, and they are further described in the next chapter, "Protocol Details." ■


## Obtaining a provisional address

Obtaining a provisional address upon startup is accomplished in two different ways depending on whether the node has previously saved an address in parameter RAM. An address saved in pRAM consists of two parts: the 16-bit network number, denoted $nnnn, and the 8-bit node ID, denoted $yy. The concatenated 24-bit address value of [network number, node ID] is denoted $nnnnyy.

### If no address was previously saved in pRAM

Upon starting up when no information is saved in parameter RAM, a node will randomly select a provisional network number $FFnn in the startup range. This range is specified to be $FF00 to $FFFE inclusive (most significant byte first). The node then also randomly selects a node ID $yy (yy cannot be $00, $FE, or $FF). As in AppleTalk Phase 1, the node must use AARP to ensure that $FFnnyy is not in use by any other node on the network. If another node is already using this address, the node should try all other possibilities for $FFnnyy until a valid provisional address is obtained.

### If an address was saved in pRAM

If there is a saved 24-bit address of the form $nnnnyy in pRAM, the node can use it as the provisional address. The node must use AARP to ensure that this address is not in use by any other node. If another node is already using this address, the node should try all other possibilities for yy (yy cannot be $00, $FE, or $FF) keeping nnnn the same until all possibilities are exhausted (nnnn is probably a valid network number for this network unless the node has been moved from another network).

If all possibilities are exhausted, the node must select a new address as if none was previously saved in pRAM (as described in the previous section).

## Obtaining network information

Once a node has obtained a provisional address, if a router is running on the network, the node can acquire information about its network from the router. The node learns the range of valid network numbers and confirms that its saved zone name is valid for that network. If it does not currently have a saved zone name, it can obtain the list of available ones from a router and pick one in an implementation-dependent manner.

Network information is obtained by using a new request packet, ZIPGetNetInfo. If the node has a saved zone name for the zone to which it wishes to belong, this name is also included in the request. The request is retransmitted until a router responds or the retry count is exceeded. If no response is received, this is taken to imply that *no* router is currently running on the network.

The response will provide the following information:

* the address of the responding router (to be saved as the node's initial A-ROUTER parameter)
* the range of valid network numbers for this network (to be saved as the node's THIS-NETWORK-RANGE parameters)
* the zone multicast address to use for the desired zone name (if this zone name was valid)
* the default zone name (and multicast address) to use if the requested zone name is not valid

Upon receiving the response, a node registers with its data-link layer (in a data-link-dependent manner) to receive packets sent to the zone multicast address; routers will send NBP broadcasts (for the node's zone) to this link-level address.

## Obtaining a valid address and zone

After obtaining the desired network information, if a node's provisional network number is not in THIS-NETWORK-RANGE, the node can proceed to select an address in this range, and then ensure through the use of AARP that the address is not in use by another node on the network. This new address then becomes the node's final address, and is saved in pRAM. Note that, except when a node is first started on a network, its provisional address will typically be in the correct range, and it should not have to repeat the address acquisition process.

If the zone to which a node wishes to belong is not valid for its network, or if the node has no saved initial zone name, it is possible for the node to obtain the zones list for the network. This is obtained from a router by using the new ZIP GetLocalZones request, and then selecting a zone from that list in an implementation-dependent manner (on the Macintosh, a dialog box is displayed asking the user to choose a zone). The node can then issue the ZIP GetNetInfo request to obtain the node's zone multicast address, and to register that address with its data-link layer.

Note that in a network with just one zone name in its zones list, a user need not be made aware of the node's zone name at all. Such a network will require no user intervention to select the node's zone name, and should appear no different from a nonextended network.

## Operating without a router

Most extended networks are likely to be connected by routers into internets. However, extended addressing is implemented in a way that also permits operation on a network where no router is present. Such extended networks will in particular be used when more than 254 nodes are to be connected to a single AppleTalk network.

Furthermore, an extended network may operate without a router as a transitional state between operating with and without routers.


### If no router is present

If no router responds to a ZIP GetNetInfo request, the node uses the provisional address as its final address. Any previously saved zone name is ignored; the node is, for now, in zone "*" and has no zone multicast address. If a router comes up later, the node will be able to communicate with the internet as long as its final address is still within the network number range for the network (this will typically be the case if the provisional address was obtained from pRAM and the node has not been moved to another network).


### When a router first comes up

When a router first comes up on a network, the address of a node already operating on the network might now not be valid for the network (its network number may be outside the range entered in the router). This condition must be corrected before the node can continue to communicate on the internet. The following is the procedure a node should use when first detecting a router (via RTMP packets).

#### If the node's network number is in the startup range

If a node's address is of the form $FFnnyy, that is, in the startup range, the router must be ignored until the node's AppleTalk implementation is reinitialized to allow the node to acquire a valid internet address. The node should not send any packets for forwarding on the internet, nor name lookup requests to A-ROUTER. It can, however, continue to access nodes on the local network in the normal fashion. The node remains in zone "*", but will continue to see all nodes on the local network regardless of their zone (since it will still send NBP lookups as AppleTalk broadcasts).

If possible, the node should alert its user that the node's AppleTalk implementation must be reinitialized in order to continue to access the internet. Nodes using network numbers not in the startup range will not be able to see those nodes using network numbers in the startup range. This is true regardless of the zone, since the network number startup range has no zone multicast address. Likewise, nodes outside this network also will not see its nodes that are using network numbers in the startup range.

#### If the node's network number is not in the startup range

If the node's network number is *not* in the startup range, upon detecting the first router, the node needs to determine whether its own address is in the correct network number range for the network. This correct network number range is determined from the header of the RTMP packet that alerted the node of the router's existence.


### If the node's network number is in the correct range

If the node's network number is in the correct network number range, it can proceed to verify that its desired zone name is valid for the network, obtain its zone multicast address through a ZIP GetNetInfo request, and set its data-link layer to listen on that address. If its desired zone name is not valid for the network, the node can either issue a ZIP GetLocalZones request and ask the user to select a zone or decide to belong to the default zone for that network. A valid zone name should be saved in long-term storage upon receipt.

### If the node's network number is in neither the startup range nor the correct range

If the node determines that its network number is neither in the startup range nor in the correct network number range, it should behave exactly as if its address was in the startup range. However, nodes in the valid network number range that had been communicating with this node until the router came up will now lose access to the node. The node's AppleTalk implementation should be restarted as soon as possible.

### When the last router goes down

When a network on which one or more routers have been running loses all routers, the normal mechanism for aging the A-ROUTER entry in nodes should prevail. In addition, the node should also expand THIS-NETWORK-RANGE to $0001–$FFFE, making all network numbers valid. The node will continue to operate with the address that it was using. Therefore, the network condition reverts back to one where no routers are available at startup. A node's zone name should revert to "*", and the node's zone multicast address should be deleted (if one has been set).

## Extended addressing in operation

Sending a packet remains much the same as on a nonextended network. A node determines whether the desired destination is on the local network, and if so, obtains the destination node's hardware address using AARP and sends the packet out. If the destination node is not on the local network, AARP can be used to obtain the hardware address of a router and the packet can be sent to that router.

This is much like the AppleTalk Phase 1 DDP algorithm of comparing the destination network number to THIS-NET and sending the packet to A-ROUTER if it does not match. Instead, the node now compares the destination network number to THIS-NETWORK-RANGE and sends it to A-ROUTER if it is not in this or the startup range. (This scheme can, however, result in an extra hop for off-network traffic; a more efficient scheme to choose the "best" router is described in the section "DDP" in the next chapter.)

Note that, on an extended network, DDP broadcasts can now occur in three forms:

* A **network-wide DDP broadcast** is addressed to destination network $0000, node ID $FF, and received and accepted by every node on the network.
* A **network-specific DDP broadcast** is intended for all nodes on the network whose DDP address includes the specified network number. Such a datagram is addressed to a specific network *number* (not the entire network number range), and node ID $FF. All nodes on the network will receive this as a data-link broadcast and must discard it if not intended for them (that is, if it does not match their network number).
* A **zone-specific DDP broadcast** is intended for all nodes on the network that belong to the specified zone. Such a broadcast is sent at the data-link level to a zone multicast address with DDP destination network $0000, node ID $FF. Only routers transmit zone-specific broadcasts.

The operational aspects of extended addressing are further specified in the next chapter, "Protocol Details."

