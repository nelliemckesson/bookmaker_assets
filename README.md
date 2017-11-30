# CSS, Scripts, Images and Other Assets for Macmillan's Bookmaker Implemtation

This repository contains all the assets that Bookmaker uses when converting EPUB and PDF files. Files are archived according to the process that uses them: pdfmaker or epubmaker.

## epubmaker

This subfolder contains files used during the EPUB conversion process. This includes: logo images, interior image placeholders, CSS templates for each imprint.

### css

We currently have one generic EPUB design that is used for all books. This is plain old CSS, so no special SCSS is required. To add new style definitions:

1. Open generic/epub.css.
1. Search the file to see if any rules exist for the class or element that you are adding a style for.
1. Add your new style either in the same location as the existing rules for that element, or in a new line in the file if no other rules exist.
1. Commit, push, and submit a pull request, according to the usual process.


## pdfmaker

This subfolder contains files used during the PDF conversion process. This includes: logo images, interior image placeholders, CSS templates for each imprint, JavaScript files for custom content conversions for each imprint.

### css

Most imprints are based on a core template called core_tor.css. This is the original template developed for the Tor.com novellas, that has been repurposed as the generic book template. When adding style support, you should determine if the style is specific to one imprint, in which case it would be added to the pdf.css file for that imprint, below the @import rule that imports the core_tor.css file; or, if the style should be applied to all imprints, then it should be added to core_tor.css via the SCSS subfiles.

The SCSS components include a base.scss file that contains all the main definitions, separate files for each font, files for some layout tools (like adding baseline gridlines to check the design), and then separate files where all sizes and measurements are defined (like the gridheight, base font size, and so on). These variables are used in the base.scss file instead of hard-coded measurements, so that if we ever need to create a new variation on the template, we can simply redefine the size variables, and generate a new CSS file with a different name (e.g., novel.css).

**To add a new global style**:

1. In the _modules subfolder, open the base.scss file.
1. Search the file to see if any rules exist for the class or element that you are adding a style for.
1. Add your new style either in the same location as the existing rules for that element, or in a new line in the file if no other rules exist.
1. If any of your new rules include measurements or sizes, be sure to base them on the variables, rather than hardcoding them. If no appropriate variable exists, you may add one. However, note that you'll need to add it to both torDOTcom/novella.scss and torDOTcom/novel.scss.
1. Generate the new CSS files. You'll need to generate 3 files:
  * bookmaker_assets$ cd pdfmaker/css/torDOTcom
  * torDOTcom$ sass novella.scss pdf.css
  * torDOTcom$ sass novel.scss novel.css
  * torDOTcom$ sass novella.scss core_tor.css
1. Move the new core_tor.css file to the main pdfmaker subfolder, overwriting the old file.
1. Commit, push, and submit a pull request, according to the usual process.

Here's a one-liner to generate and move all of the files. Starting from *bookmaker_assets* directory:

```
cd pdfmaker/css/torDOTcom/ && sass novella.scss pdf.css ; sass novel.scss novel.css ; sass novella.scss core_tor.css && mv core_tor.css ../ ; cd ../../../ ; git status
```

### scss snippets
As we edit or add support for new styles, we have begun pulling single styles out into 'scss snippets', where any rules pertaining to said style is in a single scss file by itself. Features that may be dynamically set based on template (such as font-size) are variable-ized, harkening back to definitions set in the scss templates. Then an 'import' for each of these scss snippets is added to the base.scss file.

## epubmaker

This subfolder contains files used during the EPUB conversion process. This includes: logo images, interior image placeholders, CSS templates for each imprint.

### css
These are stored in the pdfmaker/css/_modules subfolder

Benefits:
* Any edits for a given style would only need to be done in one place, so easy to find,
* easy to target, troubleshoot, edit, and review
* css could be compiled on the fly via scss at runtime for every bookmaker run. This was also done with an eye towards a separate project where we would preview book samples in 'realtime' based on css edits through a GUI (not in active development).
