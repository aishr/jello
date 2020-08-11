using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Jello.Models
{
    public class JelloBoard
    {
        public JelloBoard()
        {
            SharedUsers = new List<string>();
        }
        public string Identifier => Creator + "_" + Name;
        public string Creator { get; set; }
        public string Name { get; set; }
        public List<string> SharedUsers { get; set; }
        public List<string> ColumnNames { get; set; }
        public string Orientation { get; set; }
        public bool IsColumnDraggable { get; set; }
        public bool LockCardsToColumn { get; set; }
        public List<JelloColumn> ColumnContents { get; set; }

        public BoardData ToBoardData()
        {
            return new BoardData()
            {
                Id = Identifier,
                Name = Name
            };
        }
    }
}
