---
title: "A Design for The Finder's Desktop Management In a Network Environment"
source: "022_AppleTalkFilingProtocolEngineeringTechnicalNotes"
source_url: ""
pages: "35–38"
converted: "2026-04-04"
engine: "gemini-flash"
nav_order: 6
parent: "AFP Technical Notes"
layout: default
grand_parent: Areas
---
# A Design for The Finder's Desktop Management In a Network Environment

| Field | Value |
|-------|-------|
| **Source** | 022_AppleTalkFilingProtocolEngineeringTechnicalNotes |
| **Chapter** | 6 |
| **Pages** | 35–38 |
| **Converted** | 2026-04-04 |
| **Engine** | gemini-flash |

---

# Chapter 6 A Design for The Finder's Desktop Management In a Network Environment

The Finder presents Macintosh user with a unique user interface centered around the use of icons to represent objects on a disk volume. To present this interface to the user the Finder makes use of a number of data structures separate from the File System's volume catalog, all of which are maintained as resources of various types in an invisible resource file called 'Desktop'.

The Desktop file is currently used to perform three separate functions:

1. To associate documents and applications with particular icons through its 'bundle' mechanism, as well as storing the actual icon bitmaps,
2. To locate the corresponding application when a user opens a document, and
3. To store the text of comments associated with files and directories as part of the information displayed by 'Get Info'.

The management of icons centers around the concept of a *bundle*, stored as a resource of type BNDL in an application's resource fork. The BNDL resource, which is identified with a particular FileCreator type can, among other things, refer to a number of FREF resources, which can in turn indicate that a file of a particular type should be displayed using a particular icon. Together, BNDLs and FREFs can be used to determine the icon to be displayed for a given file from the Creator and Type information stored as part of its Finder Info in the catalog.

In addition, the Desktop file is used on HFS volumes to hold a list of applications stored in subdirectories on the volume. The desktop contains an APPL resource which is used by the Finder to find an application to launch when a document is selected, given the document's FileCreator information. The APPL resource basically maps a particular Creator type to a list of applications that can open documents of the specified type.

Finally, the Desktop file is used as a repository for the text of comments associated with files and directories on the volume. Comments are retrieved when the user selects 'Get Info' for a file or directory, at which time the comment text can also be changed.

The use of the current Finder in a Network Environment (i.e. on File Server volumes) has proven unsatisfactory: resource files, such as the Finder's Desktop file, are ill-suited for sharing among multiple users on a single File Server.

A new mechanism has been designed to replace the Finder's direct use of the Desktop resource file on File Server volumes completely. Eventually, this mechanism could be used transparently for both local and remote volumes. The interface to this new Desktop mechanism is presented below.



## Call Interface

The interface includes three groups of calls:

1. Icon calls (`AddIcon`, `GetIcon`, and `GetIconInfo`),
2. APPL calls (`AddAPPL`, `DeleteAPPL`, and `GetAPPL`),
3. Comment calls (`AddComment`, `DeleteComment`, `GetComment`).

Each call is mapped into a corresponding AFP command. The semantics of the AFP calls exactly parallel the semantics of the interface routines. Like FPWrite, FPAddIcon is special in that it requires a special intermediate exchange of packets to transfer the data block representing the icon bitmap.

In the descriptions of the individual calls in the following sections, the data type ResType refers to the 4-byte signatures that are part of every file's Finder Information. Each file is assigned a 'File Type' meant to be representative of the nature of the contents of the file (PNTG, TEXT, etc.) and a 'File Creator', which is a unique signature indicating the application which created the file (such as MPNT, MACA, etc.).

Before any Desktop calls can be made, the user must make an OpenDT call, as follows:

* **`Function OpenDT( VolID: Integer; Var DTRefNum: Integer): OSErr;`**

The file `RefNum` returned for the Desktop Database must be used on future calls to indicate the Desktop Database being referred to. If an error occurred on the call, the refNum returned will be zero.

When all Desktop operations have been completed, the user should make a `CloseDT` call (which takes a single argument, the `DTRefNum`) and returns an `OSErr`. This will free all resources allocated as part of the `OpenDT` call.

## Icon Related Calls

* **`Function AddIcon( DTRefNum: Integer; FileCreator, FileType: ResType; IconType: Byte; IconTag: LongInt; BitmapSize: Integer; Bitmap: Ptr): OSErr;`**

`AddIcon` adds a new icon bitmap to the Desktop database. The `FileType` and `FileCreator` arguments (4 bytes each) specify the set of files this icon is associated with, while the IconType argument may indicate a specific kind of icon. Note that for a given `FileCreator`/`FileType`, there may be a number of icons available, each with a different IconType. The IconTag argument indicates a LongInt value to be associated with the icon which will be returned along with the icon bitmap when it is retrieved. This could be used as a timestamp, for instance, to associate the creation date of the application with the icons it exports. Finally, the Size and Bitmap arguments provide the actual bitmap in question.

If an icon of the specified `IconType` already exists for the indicated `FileCreator` and `FileType`, `AddIcon` will replace the bitmap stored with the new Bitmap. An error will be returned if the size of the new bitmap is different from the size of the old bitmap.

* **`Function GetIcon( DTRefNum: Integer; FileCreator: ResType; FileType: ResType; IconType: Byte; Var Length: Integer; BitMap: Ptr): OSErr;`**


`GetIcon` retrieves the bitmap for a given icon, given its FileCreator, FileType and IconType. If an icon of type IconType of the specified FileCreator and FileType is available, it is returned. Otherwise, an ItemNotFound error is returned. The length argument used on input to indicate the size of the buffer pointed to by the BitMap pointer. When the call is completed it is overwritten with the actual size of the bitmap returned.

* **`Function GetIconInfo( DTRefNum: Integer; FileCreator: ResType; IconIndex: Integer; Var IconTag: LongInt; Var FileType: ResType; Var IconType: Byte; Var Size: Integer): OSErr`**;

`GetIconInfo` retrieves a description of an icon, given its `FileCreator` type and a numerical index. It can be used to determine the set of icons associated with a given application without knowing the FileTypes in advance. Successive calls with increasing values of IconIndex will return information on all icons associated with a given Creator type.

## Application Related Calls

* **`Function AddAPPL( DTRefNum: Integer; FileCreator: ResType; DirID: LongInt; CName: String[31]; APPLTag: LongInt): OSErr;`**

`AddAPPL` adds an entry for the application specified by the `DirID`/`CName` under the indicated ResType. The `APPLTag` argument is an additional `LongInt` stored with the mapping information. There may be more than one application with same FileCreator ResType, although the DirID/CName should uniquely identify the file. The Tag information might be used to decide among many possible applications which one to launch for a particular document (if the tag of the creator were stored in the Finder information of the document, for instance).

* **`Function RemoveAPPL( DTRefNum: Integer; FileCreator: ResType; DirID: LongInt; CName: String[31]): OSErr;`**

`RemoveAPPL` removes the mapping information for a given application indicated by its `DirID`/`CName`. Note that while the `FileCreator` type must be specified to locate the entry, the application tag is not required to remove an application entry.

Note that it is the Finder's responsibility to add and remove entries for applications which are copied to the volume or deleted, respectively. For entries which are moved or renamed, the Finder should remove the entry before the operation and add a new entry with the updated information after the operation has been completed successfully.

* **`Function GetAPPL( DTRefNum: Integer; FileCreator: ResType; Index: Integer; Var APPLTag: LongInt; Var DirID: LongInt; Var CName: StringPtr): OSErr;`**

`GetAPPL` looks up an application given its Creator `ResType`. The index argument is used to enumerate all application mappings stored. Indices `1` through `n` will retrieve the 1st through nth application mapping stored which are accessible by the caller (i.e. to which the user has Search and Read access). Unless the caller wishes to implement a special selection algorithm over all available applications, a single call to get the first mapping should suffice to find an application which can be launched to open the selected document.

## Comment Related Calls

* **`Procedure AddComment( DTRefNum: Integer; DirID: LongInt; CName: String[31];**
  **CommentText: String[199]);`**

`AddComment` stores a comment string associated with a particular file or directory on the volume. Unlike icons, there can be no more than one comment associated with any file or directory. If `AddComment` is called for a file or directory which already has an associated comment, the existing comment is replaced.

* **`Function RemoveComment( DTRefNum: Integer; DirID: LongInt; CName: String[31]): OSErr;`**

`RemoveComment` removes the comment associated with a particular file or directory. An error is returned if no comment was stored for the file or directory.

Note that while the Finder will call RemoveComment to remove comments for files or directories when they are deleted, it does <u>not</u> call `GetComment`, `RemoveComment` and `AddComment` whenever a file or directory is renamed or moved.

* **`Function GetComment( DTRefNum: Integer; DirID: LongInt; CName: String[31]; Var CommentText: String[199]): OSErr;`**

`GetComment` retrieves the comment associated with a particular file or directory. If a comment is stored, the comment text is returned. If no comment exists, an error is returned.

