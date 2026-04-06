---
title: "LLAP Access Control Algorithms"
part: "Part V - End-User Services"
source: "Inside AppleTalk Second Edition (1990)"
source_url: "https://vintageapple.org/macbooks/pdf/Inside_AppleTalk_Second_Edition_1990.pdf"
pages: "524–545"
converted: "2026-04-05"
engine: "gemini-flash"
nav_order: 22
parent: "Inside AppleTalk, 2nd Edition"
layout: default
grand_parent: Books
---


# Appendix B LLAP Access Control Algorithms
1. TOC
{:toc}


The following procedural model is written in a Pascal-like language (pseudo-code) and provided as a specification of the LocalTalk Link Access Protocol (LLAP). Any particular implementation of LLAP must follow this specification.

An equivalent specification is to be found in the following U.S. patents:

- G. Sidhu, A. Oppenheimer, L. Kenyon, R. Hochsprung: "Local Area Network with Self-Assigned Address Method," *United States Patent No. 4,689,786*, August 25, 1987.
- R. Hochsprung, L. Kenyon, A. Oppenheimer, G. Sidhu: "Local Area Network with Carrier Sense Collision Avoidance," *United States Patent No. 4,661,902*, April 28, 1987.


## Assumptions

The model assumes that the program executes fast enough so as not to introduce any execution delay into the timing of events. Where LLAP specifies a timing delay, it is assumed to be performed by means of references to a global real function, RealTime, which returns the current time in microseconds. All timing constraints are specified as real constants.

The model assumes sequential, single-process execution of the code, especially the TransmitPacket function and the ReceivePacket procedure (and the procedures they call).

In a typical implementation, packet reception is triggered by means of a hardware interrupt. The interrupt routine then executes the ReceiveLinkMgmt function. The interrupt routine must provide a mechanism for saving valid data packets and for informing higher-level protocols of this event. However, such details are implementation-dependent and are outside the scope of *Inside AppleTalk*.

The model assumes that a transmitter continuously listens to the link while waiting for its access to the line.


## Global constants, types, and variables

The following global constants, types, and variables are used throughout the model.

---

# CONST

```pascal
minFrameSize = 3;           { smallest (LAP header only) frame }
maxFrameSize = 605;         { size of largest LAP frame including FCS }
maxDataSize = 600;          { size of largest (encapsulated) LLAP data field }
bitTime = 4.34;             { bit time (μsec) }
byteTime = 39.0;            { worst case single byte time (μsec) }
minIDGtime = 400.0;         { minimum interdialog gap (μsec) }
IDGslottime = 100.0;        { slot time of transmit backoff algorithm (μsec) }
maxIFGtime = 200.0;         { maximum interframe gap (μsec) }
maxDefers = 32;             { maximum defers for a single packet }
maxCollsns = 32;            { maximum collisions for a single packet }
lapENQ = $81;               { LAP type field value of ENQuiry frame }
lapACK = $82;               {         ... ACKnowledgment frame }
lapRTS = $84;               {         ... RequestToSend frame }
lapCTS = $85;               {         ... ClearToSend frame }
hdlcFLAG = $7E;             { value of an HDLC FLAG }
wksTries = 20;              { Number of ENQ sets for a workstation to try }

TYPE
{ global result types from LAP functions }
TransmitStatus = (transmitOK, excessDefers, excessCollsns, dupAddress);
ReceiveStatus = (receiveOK, Receiving, nullReceive, frameError);
FrameStatus = (noFrame, lapDATAframe, lapENQframe, lapACKframe,
               lapRTSframe, lapCTSframe, badframeCRC, badframeSize,
               badframeType, overrunError, underrunError);

{ Data link types and structures }

bit = 0..1;
bitVector = packed array [0..7] of bit;
octet = $00..$FF;
anAddress = octet;
aLAPtype = octet;
aDataField = PACKED ARRAY [1..maxDataSize] of octet;

{ Basic structure of an LLAP frame, not including FLAGs, FCS }
frameInterpretation = (raw, structured);
aFrame = PACKED RECORD
  CASE frameInterpretation OF
    raw: rawData : PACKED ARRAY [1..maxFrameSize] of octet;
    structured: (
      dstAddr : anAddress;
      srcAddr : anAddress;
      lapType : aLAPtype;
      dataField : aDataField)
END;

VAR
    MyAddress : octet;                 { set during InitializeLAP }
    Backoff : INTEGER;                  { current backoff range }
    fAdrValid,                          { MyAddress has been validated}
    FAdrInUse,                          { Another node has same MyAddress }
    fCTSexpected : BOOLEAN;             { RTS has been sent, CTS is valid }
    deferCount, collsnCount : INTEGER;  { optional, for statistics only }
    deferHistory, collsnHistory : bitVector;
    outgoingLength, incomingLength : INTEGER;
    outgoingPacket, incomingPacket : aFrame;
```

## Hardware interface declarations

The following declarations refer to hardware-specific interfaces that are assumed to be available to the LLAP procedures. The functions are typically bits and/or bytes contained in the relevant hardware interface chip(s). Similarly, the procedures are expected to be represented in actual hardware by means of control bits.

A brief description of the assumed attributes of each of these declarations follows:

| Declaration | Description |
|---|---|
| CarrierSense | indicates that the hardware is sensing a frame on the link |
| RcvDataAvail | indicates that a data byte is available |
| rxDATA | identifies the next data byte available (when indicated by RcvDataAvail) |
| EndOfFrame | indicates that a valid closing flag has been detected |
| CRCok | indicates that the received frame check sequence (FCS) is correct (when EndOfFrame) |
| OverRun | indicates that the code did not keep up with data reception |
| MissingClock | indicates that a missing clock has been detected |
| setAddress | sets the hardware to receive frames directed to MyAddress |
| enableTxDrivers<br>disableTxDrivers | control the operation of the RS-422 drivers |
| enableTx<br>disableTx | control the operation of the data transmitter |
| txFLAG | causes the transmission of a flag |
| txDATA | causes the transmission of a data byte |
| txFCS | causes the transmission of the FCS |
| txONEs | causes 12-18 one-bits (1's) to be transmitted |
| resetRx | control the receiver |
| enableRx | |
| disableRx | |
| resetMissingClock | causes the MissingClock indication to be cleared |

The hardware interface functions/procedures are as follows:

```pascal
FUNCTION CarrierSense : BOOLEAN;        EXTERNAL;
FUNCTION RxDataAvail : BOOLEAN;         EXTERNAL;
FUNCTION rxDATA : octet;                EXTERNAL;
FUNCTION EndOfFrame : BOOLEAN;          EXTERNAL;
FUNCTION CRCok : BOOLEAN;               EXTERNAL;
FUNCTION OverRun : BOOLEAN;             EXTERNAL;
FUNCTION MissingClock : BOOLEAN;        EXTERNAL;
PROCEDURE setAddress (addr : octet);    EXTERNAL;
PROCEDURE enableTxDrivers;              EXTERNAL;
PROCEDURE disableTxDrivers;             EXTERNAL;
PROCEDURE enableTx;                     EXTERNAL;
PROCEDURE txFLAG;                       EXTERNAL;
PROCEDURE txDATA (data : octet);        EXTERNAL;
PROCEDURE txFCS;                        EXTERNAL;
PROCEDURE txONEs;                       EXTERNAL;
PROCEDURE disableTx;                    EXTERNAL;
PROCEDURE resetRx;                      EXTERNAL;
PROCEDURE enableRx;                     EXTERNAL;
PROCEDURE disableRx;                    EXTERNAL;
PROCEDURE resetMissingClock;            EXTERNAL;
```

# Interface procedures and functions

The LLAP model's interface to the next higher layer (its client) is specified in terms of the following three calls:

```pascal
PROCEDURE InitializeLLAP (hint : octet; server : boolean) ;
```


This call initializes LLAP; it is expected to be called exactly once. The `hint` parameter is a suggested starting value for the node's LocalTalk physical-link address; a value of 0 indicates that LLAP should generate a starting value. Upon return from the call, the station's actual address is available in the global variable `MyAddress`. If `server` is true, then the internal procedure `AcquireAddress` will spend extra time to determine if another node is using the selected node address.

```pascal
FUNCTION TransmitPacket (dstParam : anAddress; typeParam : aLAPtype;
        dataField : aDataField; dataLength : INTEGER) : TransmitStatus;
```

This call is provided to transmit a packet. The internal function `TransmitLinkMgmt` performs the transmission link-access algorithms.

```pascal
Procedure ReceivePacket (var dstParam : anAddress;
        var srcParam : anAddress; var typeParam : aLAPtype;
        var dataField : aDataField; var dataLength : integer);
```

This call is provided to receive a packet. The internal function `ReceiveLinkMgmt` implements the reception link-access algorithms.


## InitializeLLAP procedure

The `InitializeLLAP` procedure is called to reset LLAP's global variables to known states; it calls `AcquireAddress` to initialize `MyAddress`. The following is a procedural model for the `InitializeLLAP` procedure:

```pascal
PROCEDURE InitializeLLAP (hint : octet; server : BOOLEAN);

VAR
    i : INTEGER;

BEGIN
    Backoff := 0;
    { initialize history data for Backoff calculations }
    FOR i := 0 TO 7 DO BEGIN
        deferHistory[i] := 0;
        collsnHistory[i] := 0;
    END;
    deferCount := 0;  collsnCount := 0;    { optional }
    AcquireAddress (hint, server);
END;    { InitializeLAP }
```


## AcquireAddress procedure

The AcquireAddress procedure specifies the dynamic node ID assignment algorithm. AcquireAddress creates and sends a control packet (of type lapENQ). When no node responds after repeated attempts, the current value of MyAddress is assumed to be safe for use by this node; the state of fAdrValid reflects this fact. If the global fAdrInUse ever becomes true after a call to AcquireAddress, another node that is using the same MyAddress has been detected. The following is a procedural model for the AcquireAddress procedure:

```pascal
PROCEDURE AcquireAddress (hint : octet; server : BOOLEAN);

VAR
    maxTrys, trys : INTEGER;
    ENQframe : aFrame;

BEGIN
    IF hint > 0
    THEN myAddress := hint
    ELSE IF server
        THEN MyAddress := Random (127) + 128
        ELSE MyAddress := Random (127) + 1;

    setAddress (MyAddress);
    fAdrValid := FALSE;
    IF server
    THEN maxTrys := wksTries * 6    { servers try 6 times as much as workstations }
    ELSE maxTrys := wksTries;

    trys := 0;  fAdrInUse := FALSE;

    { the main loop of AcquireAddress -- repeatedly check for response to ENQ }

    WHILE trys < maxTrys DO BEGIN
        IF (TransmitPacket (MyAddress, lapENQ, ENQframe.dataField,0)
            = transmitOK) OR fAdrInUse
        THEN BEGIN
            IF server
            THEN MyAddress := Random (127) + 128
            ELSE MyAddress := Random (127) + 1;
            setAddress (MyAddress);
            trys := 0;
        END { IF }
        ELSE trys := trys + 1;
    END; { WHILE }

    fAdrValid := TRUE;
END;    { AcquireAddress }
```


## TransmitPacket function

The TransmitPacket function is called by the LLAP client to send a data packet. After constructing (encapsulating) the caller's dataParam, the function calls upon TransmitLinkMgmt to perform the actual link access. A procedural model for the TransmitPacket function follows:

```pascal
FUNCTION TransmitPacket (dstParam : anAddress; typeParam : aLAPType;
                        dataParam : aDataField; dataLength : INTEGER) : TransmitStatus;

BEGIN
    IF fAdrInUse
    THEN TransmitPacket := dupAddress
    ELSE BEGIN

        { copy interface data into frame for TransmitLinkMgmt }
        WITH outgoingPkt DO BEGIN
            dstAddr := dstParam;
            srcAddr := MyAddress;
            lapType := typeParam;
            dataField := dataParam;
        END; { WITH }

        outgoingLength := dataLength + 3;
        TransmitPacket := TransmitLinkMgmt;
    END; { ELSE }
END; { TransmitPacket }
```

## TransmitLinkMgmt function

The TransmitLinkMgmt function implements the Carrier Sense Multiple Access with Collision Avoidance (CSMA/CA) algorithm. LLAP attempts to minimize collisions by requiring transmitters to wait for the duration of the interdialog gap (IDG) plus a random period of time before sending their request-to-send (RTS) packets. Any transmitter that detects that another transmission is in progress while it is waiting must defer.

In order to minimize delays under light loading yet still minimize the probability of collisions under moderate to heavy loading, the random delay or backoff is picked in a range that is constantly adjusted based on the recently observed history of the node's attempts to access the link. Two history bytes or vectors (called deferHistory and collsnHistory in the pseudo-code below) are used to keep track of the number of deferrals and presumed collisions in the last eight link-access attempts. These 2 bytes are used to adjust a **global backoff mask** that can take on particular values between $0 and $F (specifically, binary 0, 01, 011, 0111, and 01111). These values determine the range of the random period to be picked.

The global backoff mask is adjusted at the beginning of a particular request to transmit a data packet, and it is used only the first time a node tries to transmit that data packet. Additionally, a **local backoff mask** is used during the retry attempts of a given data packet. The use of the local backoff mask has the effect of spreading out attempts to a nonlistening node, thus increasing the node's chances of receiving the packet.

The global backoff mask is adjusted as follows:

1. The mask starts with value 0.
2. If the node had to back off more than twice in the last eight attempts, the mask is extended by 1 bit up to a maximum of 4 bits (logical shift left and set the low-order bit). The backoff history byte is then set to all 0s so that further adjustments are inhibited until more history data has accumulated.
3. Else, if the node had to defer less than twice in the last eight attempts, the mask is reduced by 1 bit (logical shift right). The defer history byte is set to all 1s so that further adjustments are inhibited until more history data has accumulated.
4. Else, if neither of these apply, the mask is left unchanged.

Due to collisions and deferrals, LLAP may have to make many attempts to send a packet. The following sequence of operations is performed before making the first attempt:

1. The global backoff mask is adjusted as specified above.
2. The 2 history bytes are shifted left 1 bit, and the low-order bit of each is set to 0.
3. The global backoff mask is copied into a local backoff mask.

During each attempt to send a directed packet, the following sequence of operations is performed:

1. If the line is busy, the node waits until the end of the dialog. The low-order bit of the deferral history byte and the low-order bit of the local backoff mask are set to 1.
2. If the line is not busy, the node waits 400 microseconds. If the line becomes busy during this time, the node defers as previously described in step 1.

3. The random wait period is generated: A random number is picked and masked by (ANDed with) the local backoff mask. The node waits for 100 microseconds (the IDG slot time) multiplied by this random number. If the line becomes busy during this time, the node defers.
4. The node sends a lapRTS. If a lapCTS is received within the maximum interframe gap (IFG) or if the packet is to be broadcast, the data is sent. Otherwise, a collision is presumed; the low-order bit of the collision history byte is set to 1; the local backoff mask is shifted left 1 bit, and its low-order bit is set. The node then tries again.
5. If, during an attempt to send a packet, 32 collisions occur or the node has to defer 32 times, the attempt is aborted, and an error is returned to the LLAP client.

A procedural model for the TransmitLinkMgmt function follows.

◆ Note: Although the section above refers to the use of local and global backoff masks, the pseudo-code below achieves the same result by treating the local and global backoff variables as numbers, not masks, in the range 0 to 16. In either case, Backoff represents an upper limit of the random number to be picked.

```pascal
FUNCTION TransmitLinkMgmt : TransmitStatus;

    VAR
        LclBackOff, i : INTEGER;
        fBroadcast, fENQ : BOOLEAN;
        xmttimer : REAL;
        rcvdframe : FrameStatus;
        RTSframe : aFrame;

    BEGIN

        WITH RTSframe DO BEGIN
            dstAddr := outgoingPacket.dstAddr;
            srcAddr := MyAddress;
            lapType := lapRTS
        END;

fBroadcast := (outgoingPacket.dstAddr = $FF);
fENQ := (outgoingPacket.lapType = lapENQ);

{ Adjust Backoff, based upon recent history }
{ Increase Backoff if we've seen a lot of collisions }
IF bitCount (collsnHistory) > 2
THEN BEGIN
    Backoff := min (max (Backoff * 2, 2), 16);
    FOR i := 0 TO 7 DO collsnHistory[i] := 0;
END { IF }

{ Decrease Backoff if we haven't had to defer very much }
ELSE IF bitCount (deferHistory) < 2
    THEN BEGIN
        Backoff := Backoff DIV 2;
        FOR i := 0 TO 7 DO deferHistory[i] := 1
    END; { ELSE IF }

{ Shift history data }
FOR i := 7 DOWNTO 1 DO BEGIN
    collsnHistory[i] := collsnHistory[i-1];
    deferHistory[i] := deferHistory[i-1];
END; { FOR }
collsnHistory[0] := 0; deferHistory[0] := 0;

{ Initialize main loop }
deferTries := 0;         collsnTries := 0;
LclBackoff := Backoff;   transmitdone := FALSE;

{ Begin main loop }
REPEAT

    { Wait for minimum Inter-Dialog Gap time }
    REPEAT

        { Wait for any packet in progress to pass }
        IF CarrierSense
        THEN BEGIN
            { We're not really deferring, just waiting,
              but ensure minimum backoff anyway }
            LclBackoff := max (LclBackoff, 2);
            deferHistory[0] := 1;

    { Perform watchdog reset of Rx for "stuck" CarrierSense }
    xmttimer := RealTime + 1.5 * maxFrameSize * byteTime;
    REPEAT
    UNTIL ( NOT CarrierSense) OR (RealTime > xmttimer);
    IF CarrierSense THEN ResetRx;{ something's wrong, clear it }
END; { IF }

{ We could ResetMissingClock anytime, as long as it's not within IDG
slottime of sending our packet }
ResetMissingClock;

    { Wait for minimum IDG after packet (or idle line) }
    xmttimer := RealTime + minIDGtime;
    REPEAT
    UNTIL (RealTime > xmttimer) OR CarrierSense;

UNTIL NOT CarrierSense;

{ Wait our additional backoff time, deferring to others }
{ (LclBackoff - 1) is the upper bound of the random number we pick }
xmttimer := RealTime + Random (LclBackoff) * IDGslottime;
REPEAT
UNTIL (RealTime > xmttimer) OR CarrierSense;

IF CarrierSense OR MissingClock
THEN BEGIN   { defer }
    DeferCount := DeferCount + 1;  { optional }
    LclBackoff := max (LclBackoff, 2);
    deferHistory[0] := 1;
    IF deferTries < maxDefers THEN deferTries := deferTries + 1
    ELSE BEGIN
        TransmitLinkMgmt := excessDefers;
        transmitdone := TRUE;
    END { ELSE }
END { IF }

ELSE BEGIN   { NOT (CarrierSense OR MissingClock) }
    IF fENQ
    THEN transmitFrame (outgoingPacket, 3)
    ELSE transmitFrame (RTSFrame, 3);

    { use common code to detect line state }
    fCTSexpected := TRUE;
    rcvdframe := receiveFrame;
    fCTSexpected := FALSE;

IF fAdrInUse
THEN BEGIN
    TransmitLinkMgmt := dupAddress;
    transmitDone := TRUE;
END { IF }

ELSE CASE rcvdFrame OF
    noFrame:
    IF fBroadcast
    THEN BEGIN
        transmitFrame (outgoingPacket, outgoingLength);
        TransmitLinkMgmt := transmitOK;
        transmitdone := TRUE;
    END;

    lapCTSframe :
    IF (NOT fENQ) AND (NOT fBroadCast)
    THEN BEGIN
        transmitFrame (outgoingPacket, outgoingLength);
        TransmitLinkMgmt := transmitOK;
        transmitdone := TRUE;
    END;
END; { CASE }

{ Assume collision if we don't receive the expected CTS }
IF NOT transmitdone
THEN BEGIN
    CollsnCount := CollsnCount + 1;      { optional }
    collsnHistory[0] := 1;               { update history data }
    IF collsnTries < maxCollsns
    THEN BEGIN
        LclBackoff := min (max (LclBackoff*2,2),16);
        collsnTries := collsnTries + 1;
    END { IF }
    ELSE BEGIN
        TransmitLinkMgmt := excessCollsns;
        transmitdone := TRUE;
    END { ELSE }
END { IF NOT ... }
END { ELSE NOT ... }

UNTIL transmitdone;

END;   { TransmitLinkMgmt }
```


## TransmitFrame procedure

The TransmitFrame procedure is responsible for putting data on the link. Certain details, such as how a flag is sent and a packet terminated, which includes sending the frame check sequence (FCS), are not explicitly stated here since they are hardware-dependent.

```pascal
PROCEDURE TransmitFrame (VAR frame : aFrame; framesize : INTEGER);

VAR
    i : INTEGER;
    bittimer : REAL;

BEGIN
    disableRx;

    { Generate the synchronizing pulse -- really required only before RTS frames}
    bittimer := RealTimer + 1.5 * bitTime;
    enableTxDrivers;
    WHILE RealTime < bittimer DO BEGIN
    END;
    disableTxDrivers;
    bittimer := RealTimer + 1.5 * bitTimer;
    WHILE RealTime < bittimer DO BEGIN
    END;

    { Start the actual frame transmission }
    enableTxDrivers;
    enableTx;
    txFLAG;  txFLAG;     { Output 2 opening FLAG's }
    FOR i := 1 TO framesize DO
        TxData (frame.rawData[i]);
    txFCS;               { Send the FCS }
    txFLAG;              { Send the trailing FLAG }
    txONES;              { Send 12 1's for extra clocks }
    disableTxDrivers;

    { reestablish default listening mode }
    resetMissingClock;
    enableRx;

END;  { TransmitFrame }
```

## ReceivePacket procedure

The ReceivePacket procedure given below is the primary interface routine to higher levels. This procedure is described as if synchronously called by the user. In many implementations, the lower-level ReceiveLinkMgmt function would be invoked by an interrupt routine.

```pascal
PROCEDURE ReceivePacket ( VAR dstParam : anAddress; VAR srcParam : anAddress;
                         VAR typeParam : aLAPType; VAR dataParam : aDataField;
                         VAR dataLength : INTEGER);

VAR
    status : ReceiveStatus;

BEGIN

    REPEAT
        status := ReceiveLinkMgmt;
        IF status = receiveOK
        THEN BEGIN
            WITH incomingPacket DO BEGIN
                dstParam := dstAddr;
                srcParam := srcAddr;
                typeParam := lapType;
                dataParam := dataField;
            END; { WITH }
            dataLength := incomingLength;
        END; { IF }
    UNTIL status = receiveOK

END;    { ReceivePacket }
```

## ReceiveLinkMgmt function

The ReceiveLinkMgmt function implements the receiver side of LLAP; it would typically be called from an interrupt routine rather than from ReceivePacket.

```pascal
FUNCTION ReceiveLinkMgmt : ReceiveStatus;

VAR
    status : ReceiveStatus;
    CTSframe, ACKframe : aFrame;

BEGIN
  status := Receiving;
  WHILE status = Receiving DO
    CASE ReceiveFrame OF
      badframeCRC, badframeSize, badframeType, underrunError, overrunError:
        status := frameError;

      lapENQframe :
        IF fAdrValid
        THEN BEGIN
          ACKframe.dstAddr := incomingPacket.srcAddr;
          ACKframe.srcAddr := MyAddress;
          ACKframe.lapType := lapACK;
          TransmitFrame (ACKframe, 3);
          status := nullReceive;
        END { IF }
        ELSE BEGIN
          fAdrInUse := TRUE;
          status := nullReceive;
        END; { ELSE }

      lapRTSframe :
        IF fAdrValid
        THEN BEGIN
          CTSframe.dstAddr := incomingPacket.srcAddr;
          CTSframe.srcAddr := MyAddress;
          CTSframe.lapType := lapCTS;
          TransmitFrame (CTSframe, 3);
        END { IF }
        ELSE BEGIN
          fAdrInUse := TRUE;
          status := nullReceive;
        END; { ELSE }

      lapDATAframe :
        IF fAdrValid
        THEN status := receiveOK
        ELSE BEGIN
          fAdrInUse := TRUE;
          status := nullReceive;
        END; { ELSE }

      noFrame:
        status := nullReceive;

END; { CASE }
ReceiveLinkMgmt := status;

END; { ReceiveLinkMgmt }
```

## ReceiveFrame function

The ReceiveFrame function is responsible for interacting with the hardware.

```pascal
FUNCTION ReceiveFrame : FrameStatus;

VAR
    rcvtimer : REAL;

BEGIN

    { Provide timeout for idle line }
    rcvtimer := RealTime + maxIDGtime;
    REPEAT
    UNTIL CarrierSense OR (RealTime > rcvtimer);
    IF NOT CarrierSense
    THEN BEGIN
        ReceiveFrame := noFrame;
        EXIT (ReceiveFrame);
    END; { IF }

    { Line is not idle, check if frame is for us }
    rcvtimer := RealTime + maxIFGtime;     {maxIFGtime is a good timeout value}
    REPEAT
    UNTIL RxCharAvail OR (RealTime > rcvtimer);
    IF RxCharAvail
    THEN BEGIN               { receive frame }
        error := FALSE;   framedone := FALSE;   incomingLength := 0;
        REPEAT
            rcvtimer := RealTime + 1.5 * byteTime;
            REPEAT
            UNTIL RxCharAvail OR (RealTime > rcvtimer);
            IF RxCharAvail
            THEN BEGIN
                IF OverRun
                THEN BEGIN
                    ReceiveFrame := overrunError;
                    error := TRUE;
                END { IF OverRun }
ELSE IF incomingLength < maxFrameSize
    THEN BEGIN
        incomingLength := incomingLength + 1;
        incomingPacket.rawData[incomingLength] := rxDATA;
    END { ELSE IF }
    ELSE BEGIN
        ReceiveFrame := badframeSize;
        error := TRUE;
    END; { ELSE }

IF EndOfFrame THEN
    IF CRCok
    THEN BEGIN
        incomingLength := incomingLength - 2;   { account for CRC }
        IF incomingLength < minFrameSize
        THEN BEGIN
            ReceiveFrame := badframeSize;
            error := TRUE;
        END { IF incomingLength ... }
        ELSE framedone := TRUE;
    END { IF CRCok }
    ELSE BEGIN    { bad CRC }
        ReceiveFrame := badframeCRC;
        error := TRUE;
    END;
END { IF RxCharAvail }

ELSE BEGIN    { RealTime > rcvtimer }
    ReceiveFrame := underrunError;
    error := TRUE;
END { ELSE }

UNTIL framedone OR error;

{ Check on validity of the frame }
IF framedone THEN
    IF fAdrValid THEN    { if our address if valid, check on actual type }
        IF incomingPacket.lapType < $80
        THEN ReceiveFrame := lapDATAframe;
        ELSE CASE incomingPacket.lapType OF
            lapENQ :
                ReceiveFrame := lapENQframe;

            lapACK :
            BEGIN
                ReceiveFrame := lapACKframe;
                fAdrInUse := TRUE;
            END; { lapACK }
        lapRTS :
        ReceiveFrame := lapRTSframe;

        lapCTS :
        IF fCTSexpected
        THEN ReceiveFrame := lapCTSframe
        ELSE BEGIN
            fAdrInUse := TRUE;
            ReceiveFrame := badframeType
        END; { ELSE }

        OTHERWISE
        ReceiveFrame := badframeType;
    END { CASE }

    ELSE IF incomingPacket.rawData[1] <> $FF
    THEN BEGIN
        fAdrInUse := TRUE;  { we received something we didn't expect }
        ReceiveFrame := noFrame;
    END { ELSE IF }
END { IF RxCharAvail }
ELSE ReceiveFrame := noFrame;  { no CharAvail }

resetRx;
resetMissingClock;

END;  { ReceiveFrame }
```

# Miscellaneous functions

The following low-level routines are referenced by the foregoing procedural specification.

```pascal
FUNCTION bitCount (bits : bitVector) : INTEGER;
VAR
    i, sum : INTEGER;

BEGIN
    sum := 0;
    FOR i := 0 TO 7 DO
        sum := sum + bits[i];
    bitCount := sum
END;  { bitCount }
```


```pascal
FUNCTION min (val1, val2 : INTEGER) : INTEGER;
BEGIN
    IF val1 < val2
    THEN min := val1
    ELSE min := val2
END;    { min }

FUNCTION max (val1, val2 : INTEGER) : INTEGER;
BEGIN
    IF val1 > val2
    THEN max:= val1
    ELSE max:= val2
END;    { max }

FUNCTION Random (maxval : INTEGER) : INTEGER;
BEGIN
    { this function is implemented as any "good" pseudorandom number generator
      that produces a result in the range 0..maxval-1 }
END;
```

## SCC implementation

One of the integrated circuits used in the implementation of LocalTalk is the Zilog 8530 Serial Communications Controller (SCC). This section explains how the hardware interface routines declared in the foregoing sections could be implemented with that device. This explanation does not imply that the SCC must be used in the implementation of LLAP. Many other devices can be employed effectively to implement LLAP. All of the following registers and bit names are used by Zilog in its SCC documentation.

| Declaration | Description |
| :--- | :--- |
| CarrierSense | indicates that the hardware is sensing a frame on the link; corresponds to the complement of the SYNC/HUNT bit in RR0 |
| RcvDataAvail | indicates that a data byte is available; corresponds to the Rx Character Available bit in RR0 |
| rxDATA | identifies the next data byte available (RR8) |
| EndOfFrame | indicates that a valid closing flag has been detected; the EndOfFrame bit in RR1 |
| **CRCok** | indicates that the received frame's FCS is correct (when EndOfFrame is true); the complement of the CRC/Framing Error bit in RR1 |
| **OverRun** | indicates that the code did not keep up with data reception; the Rx Overrun Error bit in RR1 |
| **MissingClock** | indicates that the hardware has detected a missing transition on the link; the One Clock Missing bit in RR10 |
| **setAddress** | sets the hardware to receive frames whose destination address matches MyAddress; sets WR6 in the SCC |
| **enableTxDrivers**<br>**disableTxDrivers** | control the operation of the RS-422 drivers; the drivers would generally be controlled by one of the SCC's output bits (on the Macintosh computer, it's the RTS bit in WR5) |
| **enableTx**<br>**disable Tx** | control the operation of the data transmitter by means of the Tx Enable bit in WR5 |
| **txFLAG** | causes the automatic transmission of a flag at frame opening when Tx Enable is set; however, code must delay long enough to cause the extra flag; the trailing flag is generated automatically at frame end as part of the Tx Underrun processing |
| **txDATA** | causes the transmission of a data byte (WR8) |
| **txFCS** | causes the automatic transmission of the FCS by letting Tx Underrun occur |
| **txONEs** | causes 12-18 one-bits (1's) to be sent by disabling the SCC transmitter (setting TX Enable to 0) while leaving the RS-422 drivers on and delaying |
| **resetRx**<br>**enableRx**<br>**disableRx** | control the receiver by means of the Rx Enable bit in WR3; resetRx should also flush the receive FIFO |
| **resetMissingClock** | causes the MissingClock indication to be cleared by a Reset Missing Clock command via WR14 |

## CRC-CCITT calculation

The CRC-CCITT (cyclic-redundancy check Consultative Committee on International Telephone & Telegraph) algorithm, used to determine the FCS, uses the standard CRC-CCITT polynomial:

$G(x) = x^{16} + x^{12} + x^5 + 1$

The CRC-CCITT FCS value corresponding to a given packet is calculated based on the following polynomial division identity:

$$\frac{M(x)}{G(x)} = Q(x) + \frac{R(x)}{G(x)}$$

where:

$M(x)$ = binary polynomial (corresponding to the packet after complementing its first 16 bits)

$R(x)$ = remainder after dividing $M(x)$ by the generating polynomial (its coefficients are the bits of the CRC)

$Q(x)$ = quotient after dividing $M(x)$ by the generating polynomial (its coefficients are ignored when calculating the CRC)

At the transmitter, the implementation of the CRC for the FCS field computes the CRC starting with the first bit of the destination node ID following the opening flag and stopping at the end of the data field. The FCS field is equal to the 1's complement of the transmitter's remainder. The same calculation is performed at the receiver; however, the FCS bytes themselves are included in the computation. The result of a correctly received transmission is then the binary constant 0001110100001111 ($x^{15}...x^0$). This constant is a characteristic of the divisor.

In addition to the division of the data's binary value by the generating polynomial to yield the remainder for checking, the following manipulations occur:

- The dividend is initially preset to all 1's before the computation begins, which has the effect of complementing the first 16 bits of the data.
- The transmitter's remainder is inverted bit-by-bit (FCS field) as it is sent to the receiver. The high-order bit of the FCS field is transmitted first ($x^{15}...x^0$).

If the receiver computation does not yield the binary constant 0001110100001111, the packet is discarded.
