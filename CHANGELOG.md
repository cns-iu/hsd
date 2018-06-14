# Changelog

Changelog for the HSD project.

## 0.0.5 - 2018-06-14
### Added
    - Fifth Sprint Release for HSD, see updated [demo site](https://cns-iu.github.io/hsd/)
    - Cleaned up the UI and removed old versions of the SumTree visualization
    - Visualization now automatically resizes to the user's display
    - UI should be cleaner and easier to present
    - Data is now loaded from a custom i2b2 endpoint (the initial data is cached).
### Known Issues
    - The i2b2 endpoint's CORS settings are not quite setup right yet, so sometimes it will take clicking twice on a node to get it to open.

## 0.0.4 - 2018-03-16
### Added
    - Fourth Sprint Release for HSD, see updated [demo site](https://cns-iu.github.io/hsd/)
    - Added an expanded tooltip display
    - Improved the text and look and feel of the legend display
    - Added fixed options for both opacity and color encoding
    - Removed external dependencies such that there are no outside http calls when loading the software
    - Elements within a Sum Box now have a minimum size of 2px for legibility

## 0.0.3 - 2018-02-27
### Added
    - Third Sprint Release for HSD! [demo site](https://cns-iu.github.io/hsd/)
    - Major refactoring of the sum tree code to better position it for future additions, reuse, and extensibility
    - Cleaned up the visualization by optimizing label placement, adding an axis label
    - Added an option to cumulatively size sum boxes
    - Added options for changing the color, size, and sum box sizing options dynamically
    - Added a dynamic legend keyed off the new encoding options

## 0.0.2 - 2018-02-02
### Added
    - Second Sprint Release for HSD! [demo site](https://cns-iu.github.io/hsd/)
    - Added summary labels above the sum-boxes
    - Log-scaled the height of the sum boxes
    - Added expand/collapse nodes on click

## 0.0.1 - 2018-01-12
### Added
    - First WIP release of the project following Sprint 1!
    - Created two visualizations using the PCORI data provided: a standard tree, and a "SumTree"
    - Created a [demo site](https://cns-iu.github.io/hsd/) for presenting the four screens created during Sprint 1.
