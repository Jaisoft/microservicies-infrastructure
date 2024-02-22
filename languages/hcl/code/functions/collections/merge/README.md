https://developer.hashicorp.com/terraform/language/functions/merge

terraform init -backend=false

terraform console


> merge({a="b", c="d"}, {e="f", c="z"})
{
  "a" = "b"
  "c" = "z"
  "e" = "f"
}
