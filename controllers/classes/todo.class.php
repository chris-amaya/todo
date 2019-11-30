<?php

    class Todo
    {
        private $con;

        public function __construct($con)
        {
            $this->con = $con;
        }

        public function getTasks()
        {
            $query = mysqli_query($this->con, "SELECT * FROM todos");
            return $this->validateQuery($query);
        }

        public function insertTask($task) {
            $query = mysqli_query($this->con, "INSERT INTO todos VALUES (null, '$task', 0)");
            $id = mysqli_insert_id($this->con);
            // $id = $query->insert_id;
            // $id = new 
            // return $this->validateQuery($query)$asdf;
            // return new ArrayObject()
            return json_encode(array(
                'query' => $query,
                'id' => $id
                )
            );
        }

        
        private function validateQuery($query)
        {
            if(gettype($query) == 'boolean') {
                if(mysqli_affected_rows($query) > 0) {
                    return $query;
                } else {
                    return false;
                }
            } else {
                if(mysqli_num_rows($query) > 0)
                {
                    return $query;
                } else {
                    return false;
                }
            }
        }



    }



?>
