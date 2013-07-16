var BooksList = '{"boardbooks": ['+
    '{"Name":"The Bear Went Over the Mountain by Rosemary Wells", "Author":"Rosemary Wells"},'+
    '{"Name":"Brown Bear, Brown Bear, What Do You See?", "Author":"Bill Martin, Jr"},'+
    '{"Name":"Clap Hands", "Author":"Helen Oxenbury"},'+
    '{"Name":"Goodnight Moon", "Author":"Margaret Wise Brown"},'+
    '{"Name":"Moo, Baa, La, La, La", "Author":"Sandra Boynton"},'+
    '{"Name":"Old MacDonald Had a Farm", "Author":"Pam Adams"},'+
    '{"Name":"Peek-a-who?!", "Author":"Nina Laden"},'+
    '{"Name":"Wheels on the Bus", "Author":"Raffi"}]}';

		  
/*var NurseryRhymes = ["Good For You! Toddler Rhymes for Toddler Times",
		     "Read Aloud Rhymes for the Very Young",
		     "Tomie dePaola&lsquo;s Mother Goose"
		     "Welcome, Baby! Baby Rhymes for Baby Times"
		     "Pat-A-Cake and Other Play Rhymes"
		    ];
*/

var boardbooks = $.parseJSON(BooksList).boardbooks;

var $table = $("<table></table>");

for(var i = 0; i < boardbooks.length; i++)
{
    var bkl = boardbooks[i];
    var $line = $("<tr></tr>");
    $line.append( $("<td></td>").html(bkl.Name));
    $line.append( $("<td></td>").html(bkl.Author));
    $table.append($line);
}

$table.appendTo($("#content"));


