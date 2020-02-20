# Delete Files

Delete files easily.

## INSTALLATION
1. Install the module in your usual way (it has no non-core dependencies), and enable it at /admin/modules
2. Set permissions to view & delete files at /admin/people/permissions
3. Go to the Delete Files tab at /admin/content/delete, which shows the writable files in your site's public//: directory
4. Delete files
5. Profit

If a file you've deleted's managed by Drupal, this module replaces it with a new empty file to head off potential problems with dangling file references. Be careful though: don't delete what you don't understand. (Which is not a bad rule to live by.)

## ALTERNATIVES TO USING THIS MODULE
- Delete files via the file system (if you have access to that)
- Use the [views bulk operations module][vbo] to add a delete action to /admin/content/files - only works for managed files, and not always then
- Cry

[vbo]: https://www.drupal.org/project/views_bulk_operations
