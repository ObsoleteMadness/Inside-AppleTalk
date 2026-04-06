---
title: "Long/Short Name Management Algorithms"
source: "022_AppleTalkFilingProtocolEngineeringTechnicalNotes"
source_url: ""
pages: "115–116"
converted: "2026-04-04"
engine: "gemini-flash"
nav_order: 22
parent: "AFP Technical Notes"
layout: default
grand_parent: Areas
---
# Long/Short Name Management Algorithms

| Field | Value |
|-------|-------|
| **Source** | 022_AppleTalkFilingProtocolEngineeringTechnicalNotes |
| **Chapter** | B |
| **Pages** | 115–116 |
| **Converted** | 2026-04-04 |
| **Engine** | gemini-flash |

---

# Appendix B Long/Short Name Management Algorithms

Files and directories in AFP possess two names, a Long Name and a Short Name, because of differences in Macintosh and MS-DOS naming rules. Macintosh permits file and directory names to be made up of at most 32 characters, where valid characters may be any printable ASCII code except colon ($3A). MS-DOS is more restrictive; names may be up to eight alphanumeric (plus other) characters, optionally followed by period ($2E) and a one-to-three alphanumeric (plus other) character extension. The dual naming convention was devised to allow file servers to present to Macintosh and MS-DOS users a name space that is compatible with each of their respective file systems. Yet in order to ensure that an object can be uniquely specified by either name, some rules must be adhered to.

AFP naming rules are such that any MS-DOS name can be used directly as an object's Short Name, and any Macintosh name can be used directly as a Long Name. It is up to the file server to generate the "other" name for each object, deriving it from the first and making the name as "close" as possible to minimize semantic loss. Since Long Name format is a superset of Short Name format, some cases are easily handled. For example, if an MS-DOS machine generates a Short Name for an object, the object's Long Name can be made the same as the Short Name. Deriving a Short Name from a Long Name is not as simple, and AFP does not stipulate an exact algorithm for doing this, so that different servers may perform it differently. However, it is crucial that no two objects in a given directory have the same Short Name or the same Long Name. This ensures that any object can be uniquely specified by either name.

Below are the algorithms intended for use by file servers for creating and maintaining a consistent dual name space.

When an object is created (either by FPCreateFile or FPCreateDir), the caller supplies the object's name and a name type that indicates whether the name is of Short format or Long format. The server must of course first check the name itself to verify that it conforms to the specified format. The algorithm below describes how servers are to assign Short and Long names to objects:

```
IF name type is Short OR name is in Short format
THEN    check for new name in list of short names
        IF name already exists
        THEN    return ObjectExists error
        ELSE set object's Short and Long names to new name

ELSE { name type is Long OR name is in Long format }
        check for new name in list of long names
        IF name already exists
        THEN    return ObjectExists error
        ELSE set object's Long Name to new name
             derive Short Name from Long Name
```

This algorithm is to be used for renaming as well (FPRename). When an object is renamed, both names will be changed using the above rules.


Note that this algorithm mandates that whenever an object is named with a Short Name format name, the Long Name will always match. This is done so that servers need only check one list, Long Names or Short Names, for each creation or renaming operation.

An interesting problem can arise. Consider the case in which a server contains a Macintosh file with a Long Name _MacFileWithLongName_ and a Short Name _MacFile_ which the server derived from the Long Name. This Short Name is not normally visible to Macintosh workstations. Now suppose that a user at a Macintosh decides to create a new file in the same directory with the Long Name _MacFile_. The call must fail, because by the above algorithm the new file's Short Name and Long Name must both be set to _MacFile_ since it is in Short format. Hence the user is returned an _ObjectExists_ error even though the directory does not appear to contain a file by that Long Name.
